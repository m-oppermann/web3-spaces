import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  const body = req.body
  // Add user
  if (req.method === "POST") {
    try {
      const newUser = await prisma.user.create({
        data: {
          address: body.address,
          ensName: body.ensName,
          ensAvatar: body.ensAvatar,
        },
      })
      return res.status(200).json(newUser, { success: true })
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating user", success: false })
    }
    // Update user
  } else if (req.method === "PUT") {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          address: body.address,
        },
        data: {
          ensName: body.ensName,
          ensAvatar: body.ensAvatar,
        },
      })
      return res.status(200).json(updatedUser, { success: true })
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error updating user", success: false })
    }
    // Read users
  } else if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany()
      return res.status(200).json(users, { success: true })
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error reading users", success: false })
    }
    // If method is not POST or GET
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false })
  }
}
