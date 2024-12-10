import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/app/utils/dbConfig"

export async function POST(req: Request) {

    try {
      const { username, email, password } = await req.json();
  
      if (!username || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db("ecommerce");
  
      const existingUser = await db.collection("users").findOne({
        $or: [{ username }, { email }]
      });

      if (existingUser) {
        return NextResponse.json({ message: "Username or email already exists" }, { status: 400 });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = { username, email, password: hashedPassword };
      const result = await db.collection("users").insertOne(newUser);
  
      return NextResponse.json({ message: "User registered successfully", userId: result.insertedId }, { status: 201 });
    
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    
    }

  }