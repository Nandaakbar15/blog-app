import {
  getCategoryById,
  updateCategory,
} from "@/app/lib/controller/categoryController";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const categoryId = parseInt(id);

  const category = await getCategoryById(categoryId);

  if (!category) {
    return NextResponse.json({
      statusCode: 400,
      message: `The data with ID ${category} is not found!`,
    });
  }

  return NextResponse.json(category);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  return await updateCategory(req, parseInt(id));
}
