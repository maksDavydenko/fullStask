import { GetServerSideProps } from "next";
import dbConnect from "../lib/db";
import Article from "../models/Article";
import Pagination from "../components/Pagination";
import Sort from "../components/Sort";
import Search from "../components/Search";

interface HomeProps {
  articles: any[];
  totalPages: number;
  currentPage: number;
  sortField: string;
  sortOrder: string;
  search: string;
}

const Home = ({
  articles,
  totalPages,
  currentPage,
  sortField,
  sortOrder,
}: HomeProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Articles</h1>
      <Search />
      <Sort sortField={sortField} sortOrder={sortOrder} />
      <div className="mt-4">
        {articles.map((article) => (
          <div key={article._id} className="mb-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  const { query } = context;
  const page = parseInt(query.page as string) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const sortField = query.sortField || "publishedDate";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  const findQuery = search ? { title: new RegExp(search, "i") } : {};

  const articles = await Article.find(findQuery)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limit);

  const totalArticles = await Article.countDocuments(findQuery);
  const totalPages = Math.ceil(totalArticles / limit);

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      totalPages,
      currentPage: page,
      sortField,
      sortOrder: query.sortOrder || "desc",
      search: search || "",
    },
  };
};

export default Home;
