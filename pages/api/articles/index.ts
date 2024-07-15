import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/db";
import Article from "../../../models/Article";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  switch (req.method) {
    case "GET":
      const articles = await Article.find();
      res.status(200).json(articles);
      break;
    case "POST":
      const newArticle = new Article(req.body);
      await newArticle.save();
      res.status(201).json(newArticle);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
