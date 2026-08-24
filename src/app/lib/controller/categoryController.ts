import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";

export async function getAllCategories(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;

    const category = await prisma.category.findMany({
      skip: skip,
      take: limit,
    });

    const totalData = await prisma.category.count();

    return NextResponse.json({
      statusCode: 200,
      data: category,
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
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
}

export async function getCategoryById(id: number) {
  try {
    return await prisma.category.findUnique({
      where: { id: id },
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error, could not fetch the data!",
    });
  }
}

export async function addnewCategory(req: NextRequest) {
  try {
    const { name, slug } = await req.json();

    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json({
      statusCode: 201,
      message: "Successfully add new data!",
      data: category,
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error, failed to add new data!",
    });
  }
}

export async function updateCategory(req: NextRequest, id: number) {
  try {
    const { name, slug } = await req.json();

    const updateData = {
      name,
      slug,
    };

    const category = await prisma.category.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json({
      statusCode: 201,
      message: "Successfully update Category",
      data: category,
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error, could not update the data!",
    });
  }
}

export async function deleteCategory(req: NextRequest, id: number) {
  try {
    await prisma.category.delete({
      where: { id: id },
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);

    return NextResponse.json({
      statusCode: 200,
      message: "Error, failed to delete the data!",
    });
  }
}
