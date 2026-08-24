import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export async function login(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Cek apakah email ada di database
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({
        statusCode: 401,
        message: "Invalid email or password!",
      });
    }

    // Bandingkan password dengan yang ada di database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        statusCode: 401,
        message: "Invalid email or password!",
      });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Login Successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error, failed to login!",
    });
  }
}
