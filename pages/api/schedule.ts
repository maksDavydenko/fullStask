import { NextApiRequest, NextApiResponse } from "next";
import { parseAndSaveArticles } from "../../lib/rssParser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await parseAndSaveArticles("https://example.com/rss");
      res
        .status(200)
        .json({ message: "Articles parsed and saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to parse and save articles", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
