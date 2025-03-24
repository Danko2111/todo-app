export default function TodoSort({ sortBy, handleUpdateSort }) {
  return (
    <div className="flex gap-2 bg-white rounded">
      <button
        className={`px-2 py-1 rounded ${
          sortBy === "" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleUpdateSort("")}
      >
        None
      </button>
      <button
        className={`px-2 py-1 rounded ${
          sortBy === "dueDate" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleUpdateSort("dueDate")}
      >
        Sort by Due Date
      </button>
      <button
        className={`px-2 py-1 rounded ${
          sortBy === "title" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleUpdateSort("title")}
      >
        Sort by Title
      </button>
    </div>
  );
}
