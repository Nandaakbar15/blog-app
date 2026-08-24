import { login } from "@/app/lib/controller/authController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await login(req);
}
