const { v4: uuidv4 } = require("uuid");

// In-memory store for todos
let todos = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    title: "Buy Groceries",
    description: "Milk, eggs, bread, and fruits.",
    dueDate: "2025-04-01",
    completed: false,
    createdAt: "2025-03-20T09:00:00.000Z",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    title: "Workout Session",
    description: "Attend a yoga class or go for a run.",
    dueDate: "2025-04-02",
    completed: false,
    createdAt: "2025-03-21T15:30:00.000Z",
  },
];

exports.getTodos = (req, res) => {
  let results = [...todos];

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

  res.json(results);
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

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  // Update fields if provided
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (dueDate !== undefined) todo.dueDate = dueDate;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
};
