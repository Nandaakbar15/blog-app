import { NextResponse } from "next/server";
import { prisma } from "../prisma";

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json({
      statusCode: 200,
      data: posts,
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 404,
      message: "Error! Could not fetch the data.",
    });
  }
}

export async function addNewPost(req: Request) {
  try {
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error! Could not add new post.",
    });
  }
}
