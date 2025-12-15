import fs from "fs/promises";
import path from "path";
import { prisma } from "../lib/prisma.js";

const FILE = path.join(process.cwd(), "data", "posts.json");

async function migrate() {
  const raw = await fs.readFile(FILE, "utf-8");
  const posts = JSON.parse(raw);

  for (const p of posts) {
    await prisma.post.create({
      data: {
        title: p.title ?? "",
        slug: p.slug ?? "",
        summary: p.summary ?? "",
        content: p.content ?? ""
          },
    });
  }

  console.log("✅ Migration complete");
  process.exit();
}

migrate();
