const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

// Read the JSON file
function readData() {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData);
}

// Write data to the JSON file
function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data));
}

function getAllTodos() {
  return readData();
}

function getToDoById(id) {
  const data = readData();
  return data.find((item) => item.id === id);
}

function createTodo(item) {
  const data = readData();
  data.push(item);
  writeData(data);
}

function updateToDo(id, updatedItem) {
  const data = readData();
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    writeData(data);
    return data[index];
  }
  return null;
}

function deleteToDo(id) {
  const data = readData();
  const newData = data.filter((item) => item.id !== id);
  writeData(newData);
}

module.exports = {
  getAllTodos,
  getToDoById,
  createTodo,
  updateToDo,
  deleteToDo,
};
