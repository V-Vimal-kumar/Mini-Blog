import pool from "./db";

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
  const [rows] = await pool.query(
    "SELECT * FROM posts ORDER BY createdAt DESC"
  );
  return rows;
}

// GET single post by slug
export async function getPostBySlug(slug) {
  const [rows] = await pool.query(
    "SELECT * FROM posts WHERE slug = ? LIMIT 1",
    [slug]
  );
  return rows[0] || null;
}

// CREATE post
export async function createPost({ title, summary, content }) {
  const slug = slugify(title);

  const query = `
    INSERT INTO posts (title, slug, summary, content)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await pool.query(query, [
    title,
    slug,
    summary || null,
    content,
  ]);

  return {
    id: result.insertId,
    title,
    slug,
    summary: summary || null,
    content,
  };
}

// UPDATE post
export async function updatePost(slug, updates) {
  // 1. Get existing post
  const [existingRows] = await pool.query(
    "SELECT * FROM posts WHERE slug = ? LIMIT 1",
    [slug]
  );

  if (existingRows.length === 0) return null;

  const existing = existingRows[0];

  const newTitle = updates.title ?? existing.title;
  const newSlug =
    newTitle !== existing.title ? slugify(newTitle) : existing.slug;

  const query = `
    UPDATE posts
    SET title = ?, slug = ?, summary = ?, content = ?
    WHERE slug = ?
  `;

  await pool.query(query, [
    newTitle,
    newSlug,
    updates.summary ?? existing.summary,
    updates.content ?? existing.content,
    slug,
  ]);

  return {
    ...existing,
    title: newTitle,
    slug: newSlug,
    summary: updates.summary ?? existing.summary,
    content: updates.content ?? existing.content,
  };
}

// DELETE post
export async function deletePost(slug) {
  const [result] = await pool.query(
    "DELETE FROM posts WHERE slug = ?",
    [slug]
  );

  return result.affectedRows > 0;
}
