import { getPostById } from "@/app/lib/controller/postController";

export async function GET(req: number) {
  return await getPostById(req);
}
