import { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: query },
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
