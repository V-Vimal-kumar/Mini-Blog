// app/api/posts/route.js
import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "../../../lib/posts.js";

export async function GET() {
  try {
    const posts = await getAllPosts();
    console.log("[GET] /api/posts ->", posts.length, "posts");
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[GET] /api/posts error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[POST] /api/posts body:", body && Object.keys(body).length ? "(has body)" : "(empty)");
    if (!body || !body.title || !body.content) {
      return NextResponse.json({ error: "title and content required" }, { status: 400 });
    }

    const post = await createPost({
      title: body.title,
      summary: body.summary || "",
      content: body.content,
    });

    console.log("[POST] /api/posts created:", post.slug);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("[POST] /api/posts error:", err);
    // return the error as JSON (not HTML)
    return NextResponse.json({ error: "invalid request" }, { status: 500 });
  }
}
