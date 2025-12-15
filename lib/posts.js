// lib/posts.js
import  prisma  from "./prisma";

/* ---------------------------------------
   Helpers
--------------------------------------- */

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ---------------------------------------
   Queries
--------------------------------------- */

// GET all posts
export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// GET single post by slug
export async function getPostBySlug(slug) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

// CREATE post
export async function createPost({ title, summary, content }) {
  const slug = slugify(title);

  return prisma.post.create({
    data: {
      title,
      slug,
      summary: summary || null,
      content,
    },
  });
}

// UPDATE post
export async function updatePost(slug, updates) {
  const existing = await prisma.post.findUnique({
    where: { slug },
  });

  if (!existing) return null;

  const newTitle = updates.title ?? existing.title;
  const newSlug =
    newTitle !== existing.title ? slugify(newTitle) : existing.slug;

  return prisma.post.update({
    where: { slug },
    data: {
      title: newTitle,
      slug: newSlug,
      summary: updates.summary ?? existing.summary,
      content: updates.content ?? existing.content,
    },
  });
}

// DELETE post
export async function deletePost(slug) {
  try {
    await prisma.post.delete({
      where: { slug },
    });
    return true;
  } catch {
    return false;
  }
}
