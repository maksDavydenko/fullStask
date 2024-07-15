import axios from "axios";
import { parseStringPromise } from "xml2js";
import Article, { IArticle } from "../models/Article";
import connectToDatabase from "./db";

async function fetchRSSFeed(url: string) {
  const response = await axios.get(url);
  const data = await parseStringPromise(response.data);
  return data.rss.channel[0].item;
}

async function saveArticlesFromRSS(items: IArticle) {
  await connectToDatabase();

  for (const item of items) {
    const articleData: IArticle = {
      title: item.title[0],
      content: item.description[0],
      author: item["dc:creator"][0],
      publishedDate: new Date(item.pubDate[0]),
      tags: item.category,
    };

    await Article.updateOne({ title: articleData.title }, articleData, {
      upsert: true,
    });
  }
}

export async function parseAndSaveArticles(url: string) {
  const items = await fetchRSSFeed(url);
  await saveArticlesFromRSS(items);
}
