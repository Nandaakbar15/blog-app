import { addNewUsers, getAllUsers } from "@/app/lib/controller/userController";

export async function GET() {
  return await getAllUsers();
}

export async function POST(req: Request) {
  return await addNewUsers(req);
}
