export default function TodoFilter({ filter, handleUpdateFilter }) {
  return (
    <div className="flex gap-2 bg-white rounded">
      <button
        className={`px-2 py-1 rounded ${
          !filter ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleUpdateFilter("")}
      >
        All
      </button>
      <button
        className={`px-2 py-1 rounded ${
          filter === "active" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleUpdateFilter("active")}
      >
        Active
      </button>
      <button
        className={`px-2 py-1 rounded ${
          filter === "completed" ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => handleUpdateFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}
