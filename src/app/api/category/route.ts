import { NextRequest } from "next/server";
import {
  getAllCategories,
  addnewCategory,
} from "@/app/lib/controller/categoryController";

export async function GET(req: NextRequest) {
  const categories = await getAllCategories(req);

  return categories;
}

export async function POST(req: NextRequest) {
  return await addnewCategory(req);
}
