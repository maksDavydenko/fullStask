import mongoose, { Document, Model, Schema } from "mongoose";

interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
});

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);
export default Article;
