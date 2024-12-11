import { NextResponse } from "next/server";
import clientPromise from "@/app/utils/dbConfig";

export async function GET() {
  try {
    
    const client = await clientPromise;
    const db = client.db("ecommerce");

    const products = await db.collection("products").find().toArray();

    return NextResponse.json(
      { message: "Products retrieved successfully", products },
      { status: 200 }
    );

  } catch (error) {
    
    console.error("Get Products Error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    
  }

}