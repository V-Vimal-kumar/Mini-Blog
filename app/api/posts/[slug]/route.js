import { NextResponse } from "next/server";
import { getPostBySlug, deletePost, updatePost } from "../../../../lib/posts.js";

export async function GET(req, { params }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function DELETE(req, { params }) {
  const { slug } = await params;

  const ok = await deletePost(slug);
  return NextResponse.json({ deleted: ok });
}

export async function PUT(req, { params }) {
  try {
    const { slug } = await params;
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title and content required" },
        { status: 400 }
      );
    }

    const updated = await updatePost(slug, body);

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT] /api/posts/[slug] error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
