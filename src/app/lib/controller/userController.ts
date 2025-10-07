import { NextResponse } from "next/server";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 404,
      message: "Error! Could not fetch the data.",
    });
  }
}

export async function addNewUsers(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const addNewData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    await prisma.user.create({
      data: addNewData,
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Successfully add new data!",
    });
  } catch (error) {
    console.error("Error : ", error);
  }
}
