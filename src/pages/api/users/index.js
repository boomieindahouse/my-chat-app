// src/pages/api/users/index.js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ username });
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
