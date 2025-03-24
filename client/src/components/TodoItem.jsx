import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function TodoItem({
  itemData,
  handleToggleCompleted,
  handleTaskDelete,
  handleOpenEditModal,
}) {
  const { id, title, description, dueDate, completed } = itemData;
  return (
    <div
      className={`flex justify-between gap-8 items-center px-2 py-4 rounded-md ${
        completed ? "bg-slate-200" : "bg-white"
      }`}
    >
      <div className="flex gap-2 items-center">
        <button
          className={`w-8 h-8 rounded-md p-2 mr-2 ${
            completed ? "bg-blue-500" : "bg-slate-300"
          }`}
          onClick={() => handleToggleCompleted(id, !completed)}
        >
          {completed && <FaCheck className="text-white" />}
        </button>
        <div className="flex flex-col gap-2 w-80">
          <h3
            className={`font-bold ${
              completed ? "line-through text-slate-500" : "text-slate-700"
            } `}
          >
            {title}
          </h3>
          <p className={`${completed ? "text-slate-400" : "text-slate-700"}`}>
            {description}
          </p>
        </div>
      </div>
      <p
        className={`font-bold ${
          completed ? "text-slate-400" : "text-slate-700"
        }`}
      >
        Due Date: <span className="font-normal">{dueDate}</span>
      </p>
      <div>
        <button
          className="w-8 h-8 rounded-md p-2 mr-2 bg-slate-300"
          onClick={() => handleTaskDelete(id)}
        >
          <FaTrash />
        </button>
        <button
          className="w-8 h-8 rounded-md p-2 bg-slate-300"
          onClick={() => handleOpenEditModal(itemData)}
        >
          <MdModeEdit />
        </button>
      </div>
    </div>
  );
}
