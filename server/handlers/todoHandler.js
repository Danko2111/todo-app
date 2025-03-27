const { v4: uuidv4 } = require("uuid");
const {
  getAllTodos,
  createTodo,
  updateToDo,
  deleteToDo,
} = require("../utils/db");

exports.getTodos = (req, res) => {
  try {
    let results = getAllTodos();

    // Optional filtering by completion status
    if (req.query.filter) {
      if (req.query.filter === "completed") {
        results = results.filter((todo) => todo.completed === true);
      } else if (req.query.filter === "active") {
        results = results.filter((todo) => todo.completed === false);
      }
    }

    // Optional sorting by dueDate or title
    if (req.query.sort) {
      if (req.query.sort === "dueDate") {
        results.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (req.query.sort === "title") {
        results.sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `There was an error fetching your todos` });
  }
};

exports.createTodo = (req, res) => {
  const { title, description, dueDate } = req.body;

  // Ensure required fields are provided
  if (!title || !dueDate) {
    return res.status(400).json({ error: "Title and due date are required" });
  }

  const date = new Date();

  const newTodo = {
    id: uuidv4(),
    title,
    description: description || "",
    dueDate,
    completed: false,
    createdAt: date.toISOString(),
  };

  try {
    createTodo(newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `There was an error creating your todo` });
  }
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;

  try {
    const updatedToDo = updateToDo(id, req.body);
    if (!updateToDo) {
      res
        .status(400)
        .json({ error: `There was no ToDo found with the ID: ${id}` });
    }
    res.status(200).json(updatedToDo);
  } catch (err) {
    res.status(500).json({ error: `There was an error updating your todo` });
  }
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  try {
    res
      .status(200)
      .json({ message: "your ToDo task has been deleted succesfully" });
  } catch (err) {
    res.status(500).json({ error: `There was an error deleting your todo` });
  }
};
