import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";
import path from "path";
import { writeFile } from "fs/promises";
import { Status } from "@/generated/prisma";

export async function getAllPosts(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      skip: skip,
      take: limit,
      include: {
        author: true,
        category: true,
      },
    });

    const totalData = await prisma.post.count();

    return NextResponse.json({
      statusCode: 200,
      data: posts,
      meta: {
        totalData: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: page,
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

export async function getPostById(id: number) {
  try {
    return await prisma.post.findUnique({
      where: { id: id },
      include: {
        author: true,
        category: true,
      },
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
}

export async function addNewPost(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const status = (formData.get("status") as Status) || Status.draft;
    const authorId = formData.get("authorId") as string;
    const categoryId = formData.get("categoryId") as string;

    const file = formData.get("thumbnail") as File | null;
    let filename: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Simpan file ke direktori /public/uploads
      filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", filename);

      await writeFile(uploadDir, buffer);
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        status,
        thumbnail: filename,
        author: {
          connect: { id: parseInt(authorId) },
        },
        category: {
          connect: { id: parseInt(categoryId) },
        },
      },
    });

    return NextResponse.json({
      statusCode: 201,
      message: "Successfully add new post!",
      data: post,
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error! Could not add new post.",
    });
  }
}

export async function updatePost(req: Request, id: number) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const status = (formData.get("status") as Status) || Status.draft;
    const authorId = formData.get("authorId") as string;
    const categoryId = formData.get("categoryId") as string;

    const file = formData.get("thumbnail") as File | null;
    let filename: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Simpan file ke direktori /public/uploads
      filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", filename);

      await writeFile(uploadDir, buffer);
    }

    const post = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        slug,
        content,
        status,
        author: {
          connect: { id: parseInt(authorId) },
        },
        category: {
          connect: { id: parseInt(categoryId) },
        },
        ...(file && { image: file }),
      },
    });

    return NextResponse.json({
      statusCode: 201,
      message: "Successfully update the data!",
      data: post,
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error, could not update the data!",
    });
  }
}

export async function deletePost(req: Request, id: number) {
  try {
    await prisma.post.delete({
      where: { id: id },
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);
  }
}
