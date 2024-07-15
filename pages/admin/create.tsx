import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import dbConnect from "../../lib/db";
import { verify } from "jsonwebtoken";
import { IArticle } from "../../models/Article";

interface AdminProps {
  articles: IArticle;
}

const Admin = ({ articles }: AdminProps) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/api/auth/login");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {articles.map((article: IArticle) => (
          <div key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <button onClick={() => router.push(`/admin/edit/${article._id}`)}>
              Edit
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => router.push("/admin/create")}>
        Create New Article
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  try {
    verify(token, process.env.JWT_SECRET);
    await dbConnect();
    const articles = await Article.find({}).lean();
    return { props: { articles: JSON.parse(JSON.stringify(articles)) } };
  } catch (error) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }
};

export default Admin;
