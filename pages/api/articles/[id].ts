import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import Article from "../../../models/Article";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.status(200).json(article);
  } else if (req.method === "PUT") {
    const { title, content, author } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );
    return res.status(200).json(updatedArticle);
  } else if (req.method === "DELETE") {
    await Article.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end();
};

export default handler;
