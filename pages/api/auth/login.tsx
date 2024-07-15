import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
};

export default handler;
