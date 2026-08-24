import {
  getPostById,
  updatePost,
  deletePost,
} from "@/app/lib/controller/postController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const postId = parseInt(id);

  if (!postId) {
    return NextResponse.json({
      statusCode: 400,
      message: `The data with ID ${postId} is not found!`,
    });
  }

  const post = await getPostById(postId);

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  return await updatePost(req, parseInt(id));
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  return await deletePost(req, parseInt(id));
}
