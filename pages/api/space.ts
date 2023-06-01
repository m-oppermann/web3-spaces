import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  const body = req.body
  // Add space
  if (req.method === "POST") {
    try {
      const newEntry = await prisma.space.create({
        data: {
          title: body.title,
          description: body.description,
        },
      })
      return res.status(200).json(newEntry, { success: true })
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating space", success: false })
    }
    // Read spaces
  } else if (req.method === "GET") {
    try {
      const spaces = await prisma.space.findMany()
      return res.status(200).json(spaces, { success: true })
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error reading spaces", success: false })
    }
    // If method is not POST or GET
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}
