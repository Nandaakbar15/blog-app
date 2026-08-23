import { NextRequest } from "next/server";
import { addNewUsers, getAllUsers } from "@/app/lib/controller/userController";

export async function GET(req: NextRequest) {
  return await getAllUsers(req);
}

export async function POST(req: NextRequest) {
  return await addNewUsers(req);
}
