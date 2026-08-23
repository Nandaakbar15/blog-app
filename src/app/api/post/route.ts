import { NextRequest } from "next/server";
import { getAllPosts, addNewPost } from "@/app/lib/controller/postController";

export async function GET(req: NextRequest) {
  const post = await getAllPosts(req);

  return post;
}

export async function POST(req: NextRequest) {
  return await addNewPost(req);
}
