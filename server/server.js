// server.js
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the to-do routes at /api/todos
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
