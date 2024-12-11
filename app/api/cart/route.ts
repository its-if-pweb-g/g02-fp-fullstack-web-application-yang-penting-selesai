import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import clientPromise from "@/app/utils/dbConfig";

export async function POST(req: Request) {
  
    try {
    
        const { userId, productId, quantity } = await req.json();

        const client = await clientPromise;
        const db = client.db("ecommerce");

        const cart = await db.collection("carts").findOne({ userId });

        if (cart) {

            const existingProductIndex = cart.items.findIndex((item : any) => item.productId === productId);

            if (existingProductIndex > -1) {
                cart.items[existingProductIndex].quantity += quantity;
        
            } else {
                cart.items.push({ productId, quantity });
        
            }

            await db.collection("carts").updateOne({ userId }, { $set: { items: cart.items, updatedAt: new Date() } });
    
        } else {
        
            await db.collection("carts").insertOne({
                userId,
                items: [{ productId, quantity }],
                createdAt: new Date(),
                updatedAt: new Date()
            });

        }

        return NextResponse.json({ message: "Cart updated successfully" }, { status: 200 });
  
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating cart" }, { status: 500 });
  
    }

}

export async function GET(req: Request) {

    try {

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
  
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }
  
        const client = await clientPromise;
        const db = client.db("ecommerce");

        const userObjectId = ObjectId.isValid(userId) ? new ObjectId(userId) : null;

        const cart = await db.collection("carts").findOne({
            $or: [
                { userId: userId },
                ...(userObjectId ? [{ userId: userObjectId }] : [])
            ]   
        });

        if (!cart) {
            return NextResponse.json({ cart: null }, { status: 200 });
        }

        const productIds = cart.items.map((item) => 
            ObjectId.isValid(item.productId) ? new ObjectId(item.productId) : item.productId
        );

        const products = await db
        .collection("products")
        .find({ 
            $or: [
            { productId: { $in: productIds } },
            { _id: { $in: productIds } }
            ]
        })
        .toArray();

        const detailedItems = cart.items.map((item) => {
        const product = products.find(
            (p) => p.productId === item.productId || 
                p._id.toString() === item.productId || 
                p._id.toString() === item.productId
        );

            return {
                ...item,
                product: product || null,
            };
        });

        const cartSummary = {
            totalItems: detailedItems.length,
            totalQuantity: detailedItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
            totalValue: detailedItems.reduce((sum, item) => 
                sum + ((item.product?.price || 0) * (item.quantity || 0)), 0)
        };

        return NextResponse.json(
        {
            cart: {
            _id: cart._id,
            userId: cart.userId,
            items: detailedItems,
            summary: cartSummary,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
            },
        },
        { status: 200 }
        );

    } catch (error) {
      console.error("Error fetching cart:", error);
      return NextResponse.json({ message: "Error fetching cart" }, { status: 500 });
    
    }

}

export async function DELETE(req: Request) {

    try {
      
        const { userId, productId } = await req.json();
  
        if (!userId || !productId) {
            return NextResponse.json(
                { message: "User ID and Product ID are required" },
                { status: 400 }
            );
        }
  
        const client = await clientPromise;
        const db = client.db("ecommerce");
  
        const userObjectId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;
  
        const result = await db.collection("carts").updateOne(
            {     
            $or: [
                    { userId: userId },
                    { userId: userObjectId }
                ]
            },
            { 
                $pull: { 
                    items: { productId: productId } 
                },
                $set: {
                    updatedAt: new Date()
                }
            }

        );
  
      if (result.matchedCount === 0) {
        return NextResponse.json(
          { message: "Cart not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "Item removed from cart successfully" },
        { status: 200 }
      );
  
    } catch (error) {
      
        console.error("Error removing cart item:", error);
      return NextResponse.json({ 
        message: "Error removing cart item",
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    
    }

  }

  export async function PUT(req: Request) {

    try {

        const { userId, productId, quantity } = await req.json();
  
        if (!userId || !productId || quantity == null) {
            return NextResponse.json(
                { message: "User ID, Product ID, and Quantity are required" },
                { status: 400 }
            );
        }
  
        const client = await clientPromise;
        const db = client.db("ecommerce");
  
        const userObjectId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

        const result = await db.collection("carts").updateOne(
          { 
            $or: [
              { userId: userId },
              { userId: userObjectId }
            ],
            "items.productId": productId
          },
          { 
            $set: { 
              "items.$.quantity": quantity,
              updatedAt: new Date() 
            } 
          }
        );
  
        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "Cart or item not found" },
                { status: 404 }
            );
        }
  
        return NextResponse.json(
            { message: "Cart updated successfully" },
            { status: 200 }
        );
  
    } catch (error) {
      
        console.error("Error updating cart:", error);
        return NextResponse.json({ 
            message: "Error updating cart",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    
    }

  }