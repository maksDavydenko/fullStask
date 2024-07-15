import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import jwt from "jsonwebtoken";
import axios from "axios";

const AdminPage = () => {
  const [articles, setArticles] = useState<Array>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          router.push("/login");
          return;
        }

        const response = await axios.get("/api/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error(error);
        router.push("/login");
      }
    };

    fetchArticles();
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <Link href="/admin/create">
        <a className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
          Create New Article
        </a>
      </Link>
      <div className="mt-4">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <ul>
            {articles.map((article) => (
              <li key={article._id} className="mb-4">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p>{article.content}</p>
                <Link href={`/admin/edit?id=${article._id}`}>
                  <a className="mr-2 inline-block bg-yellow-500 text-white py-1 px-3 rounded">
                    Edit
                  </a>
                </Link>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="inline-block bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
