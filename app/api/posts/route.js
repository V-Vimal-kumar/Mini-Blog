import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllPosts, createPost } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body?.title || !body?.content) {
      return NextResponse.json(
        { error: "title and content required" },
        { status: 400 }
      );
    }

    const post = await createPost({
      title: body.title,
      summary: body.summary || "",
      content: body.content,
      authorId: session.user.id, // ✅ THE FIX
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("[POST] /api/posts error:", err);
    return NextResponse.json({ error: "invalid request" }, { status: 500 });
  }
}
