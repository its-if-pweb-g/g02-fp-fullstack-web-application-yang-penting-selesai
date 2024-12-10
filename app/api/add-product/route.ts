import { NextResponse } from "next/server";
import clientPromise from "@/app/utils/dbConfig";

export async function POST(req: Request) {

    try {

        const { name, category, description, price, discount, imageURL } = await req.json();

        if (!name || !category || !description || !price) {
            return NextResponse.json(
              { message: "All fields except discount and image are required" },
              { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("ecommerce");

        const product = {
            name,
            category,
            description,
            price,
            discount: discount || 0,
            image: imageURL || null,
            createdAt: new Date(),
        };

        await db.collection("products").insertOne(product);

        return NextResponse.json(
            { message: "Product added successfully", product },
            { status: 201 }
        );

    } catch (error) {
        
        console.error("Add Product Error:", error);
        
        return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 }
        );

    }

}