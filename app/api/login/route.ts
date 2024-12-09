import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/utils/dbConfig";

export async function POST(req: Request) {

    try {
      const { email, password } = await req.json();
  
      if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db("ecommerce");
  
      const user = await db.collection("users").findOne({ email });
  
      if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!
      );

      const response = NextResponse.json({
        message: "Login successful",
        token: token
      }, { status: 200 });
  
      return response;

    } catch (error) {
      console.error("Login Error:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

  }