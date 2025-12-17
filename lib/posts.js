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
  const [rows] = await pool.query(`
    SELECT posts.*, users.email AS authorEmail
    FROM posts
    JOIN users ON posts.authorId = users.id
    ORDER BY posts.createdAt DESC
  `);

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
export async function createPost({ title, summary, content, authorId }) {
  const slug = slugify(title);

  const [result] = await pool.query(
    `INSERT INTO posts (title, slug, summary, content, authorId)
     VALUES (?, ?, ?, ?, ?)`,
    [title, slug, summary || null, content, authorId]
  );

  const [rows] = await pool.query(
    "SELECT * FROM posts WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
}

// UPDATE post
export async function updatePost(slug, updates) {
  // 1️⃣ Get existing row
  const [rows] = await pool.query(
    "SELECT * FROM posts WHERE slug = ? LIMIT 1",
    [slug]
  );

  if (rows.length === 0) return null;

  const existing = rows[0];

  // 2️⃣ Prepare new values
  const newTitle = updates.title ?? existing.title;
  const newSlug =
    newTitle !== existing.title ? slugify(newTitle) : existing.slug;

  // 3️⃣ UPDATE BY ID (🔥 critical)
  const [result] = await pool.query(
    `UPDATE posts
     SET title = ?, slug = ?, summary = ?, content = ?
     WHERE id = ?`,
    [
      newTitle,
      newSlug,
      updates.summary ?? existing.summary,
      updates.content ?? existing.content,
      existing.id,
    ]
  );

  console.log("UPDATE result:", result.affectedRows);

  // 4️⃣ Fetch updated row
  const [updated] = await pool.query(
    "SELECT * FROM posts WHERE id = ?",
    [existing.id]
  );

  return updated[0];
}

// DELETE post
export async function deletePost(slug, userId) {
  const [rows] = await pool.query(
    "SELECT * FROM posts WHERE slug = ? LIMIT 1",
    [slug]
  );

  if (rows.length === 0) return false;

  const post = rows[0];

  // 🔒 AUTHORIZATION CHECK
  if (post.authorId !== userId) {
    throw new Error("Forbidden");
  }

  const [result] = await pool.query(
    "DELETE FROM posts WHERE id = ?",
    [post.id]
  );

  return result.affectedRows > 0;
}

