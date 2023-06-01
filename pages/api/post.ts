import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  const body = req.body
  // Add post
  if (req.method === "POST") {
    try {
      const newEntry = await prisma.post.create({
        data: {
          content: body.content,
          user: { connect: { id: body.userId } },
          space: { connect: { id: body.spaceId } },
        },
      })
      return res.status(200).json(newEntry, { success: true })
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating post", success: false })
    }
    // Read posts
  } else if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany()
      return res.status(200).json(posts, { success: true })
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error reading posts", success: false })
    }
    // If method is not POST or GET
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}
