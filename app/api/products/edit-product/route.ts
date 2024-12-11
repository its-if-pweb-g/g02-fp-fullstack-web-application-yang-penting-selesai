import { NextResponse } from "next/server";
import clientPromise from "@/app/utils/dbConfig";
import { ObjectId } from "mongodb";

export async function PUT(req: Request) {
  try {
    const { id, name, category, description, price, discount, imageURL } =
      await req.json();

    if (!name || !category || !description || !price) {
      return NextResponse.json(
        { message: "All fields except discount and image are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ecommerce");

    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (category) updateFields.category = category;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (discount !== undefined) updateFields.discount = discount;
    if (imageURL !== undefined) updateFields.image = imageURL;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Product Error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
