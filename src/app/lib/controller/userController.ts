import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

export async function getAllUsers(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip: skip,
      take: limit,
    });

    const totalData = await prisma.user.count();

    return NextResponse.json({
      statusCode: 200,
      data: users,
      meta: {
        totalData: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: limit,
      },
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 404,
      message: "Error! Could not fetch the data.",
    });
  }
}

export async function addNewUsers(req: NextRequest) {
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

    return NextResponse.json({
      statusCode: 500,
      message: "Error, cannot add new data!",
    });
  }
}
