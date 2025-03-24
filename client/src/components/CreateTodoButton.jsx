import React from "react";

export default function CreateTodoButton({ handleOpenModal }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={handleOpenModal}
    >
      Add Task
    </button>
  );
}
