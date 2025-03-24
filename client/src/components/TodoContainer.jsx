import { useEffect, useState } from "react";
import CreateTodoButton from "./CreateTodoButton";
import TodoItem from "./TodoItem";
import TodoModal from "./TodoModal";
import TodoFilter from "./TodoFilter";
import TodoSort from "./ToDoSort";

export default function TodoContainer() {
  const [tasks, setTasks] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch tasks when the component mounts and whenever the filter or sortBy changes
  useEffect(() => {
    fetchTasks();
  }, [filter, sortBy]);

  // Creating task
  const handleTaskCreate = (taskData) => {
    fetch(`${apiUrl}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    }).then(() => fetchTasks());
  };

  // Fetching tasks
  const fetchTasks = () => {
    // Build the URL based on current filter and sortBy states
    let url = `${apiUrl}/api/todos`;
    const queryParams = [];

    if (filter) {
      queryParams.push(`filter=${filter}`);
    }
    if (sortBy) {
      queryParams.push(`sort=${sortBy}`);
    }

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  // Editing a given task based on Param
  const handleTaskEdit = (taskId, taskData) => {
    fetch(`${apiUrl}/api/todo/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
  };

  // Updating task completed bool
  const handleToggleCompleted = (taskId, taskStatus) => {
    fetch(`${apiUrl}/api/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: taskStatus,
      }),
    })
      .then(() => {
        fetchTasks();
      })
      .catch((err) =>
        console.error("There was an error updating your tasks progress", err)
      );
  };
  // Deleting given task based on taskId
  const handleTaskDelete = (taskId) => {
    fetch(`${apiUrl}/api/todos/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetchTasks();
    });
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const handleOpenEditModal = (task) => {
    setOpenEditModal(!openEditModal);
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    setEditingTask(null);
  };

  const handleUpdateFilter = (filterVal) => {
    setFilter(filterVal);
  };
  const handleUpdateSort = (sortVal) => {
    setSortBy(sortVal);
  };

  return (
    <div className="flex flex-col gap-2 items-center max-w-[1100px] mx-auto">
      <div className="w-full flex justify-between">
        <CreateTodoButton handleOpenModal={handleOpenCreateModal} />
        <div className="flex gap-6">
          <TodoFilter filter={filter} handleUpdateFilter={handleUpdateFilter} />
          <TodoSort sortBy={sortBy} handleUpdateSort={handleUpdateSort} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 bg-slate-300 p-7 rounded-lg">
        {tasks.map((task, idx) => (
          <TodoItem
            itemData={task}
            handleToggleCompleted={handleToggleCompleted}
            handleTaskDelete={handleTaskDelete}
            handleOpenEditModal={handleOpenEditModal}
            key={`task-${idx}`}
          />
        ))}
      </div>
      {openCreateModal && (
        <TodoModal
          onClose={handleOpenCreateModal}
          onSubmit={handleTaskCreate}
          title={"Create new ToDo Task"}
          buttonName={"Add Task"}
        />
      )}
      {openEditModal && (
        <TodoModal
          onClose={closeEditModal}
          onSubmit={handleTaskEdit}
          title={"Update ToDo Task"}
          buttonName={"Update"}
          taskData={editingTask}
        />
      )}
    </div>
  );
}
