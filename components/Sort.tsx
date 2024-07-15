import { useRouter } from "next/router";

interface SortProps {
  sortField: string;
  sortOrder: string;
}

const Sort = ({ sortField, sortOrder }: SortProps) => {
  const router = useRouter();

  const handleSortChange = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sortField: field, sortOrder: order },
    });
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        className={`mx-1 px-3 py-1 rounded ${
          sortField === "title" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => handleSortChange("title")}
      >
        Sort by Title
      </button>
      <button
        className={`mx-1 px-3 py-1 rounded ${
          sortField === "publishedDate"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
        onClick={() => handleSortChange("publishedDate")}
      >
        Sort by Date
      </button>
    </div>
  );
};

export default Sort;
