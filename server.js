const { response } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tasks", { useNewUrlParser: true });
const db = mongoose.connection;
// const MongoClient = require('mongodb').MongoClient
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to db"));
db.once("open", () => console.log("Server star to db"));
// MongoClient.connect('mongo')

const newDate = () => {
  const now = new Date();
  return now.toDateString();
};

let tasks = [
  {
    id: 1,
    title: "Taking out the trash 3",
    assignee: "John Doe",
    creationDate: newDate(),
    status: "Done",
    imageSrc:
      "https://icons-for-free.com/iconfiles/png/512/avatar+circle+male+profile+user+icon-1320196710301016992.png",
  },
  {
    id: 2,
    title: "Task 2",
    assignee: "John Doe",
    creationDate: newDate(),
    status: "In Progress",
    imageSrc:
      "https://icons-for-free.com/iconfiles/png/512/avatar+circle+male+profile+user+icon-1320196710301016992.png",
  },
  {
    id: 3,
    title: "Task 3",
    assignee: "John Doe",
    creationDate: newDate(),
    status: "Done",
    imageSrc:
      "https://icons-for-free.com/iconfiles/png/512/avatar+circle+male+profile+user+icon-1320196710301016992.png",
    parentTask: null,
    subTasks: [1, 2],
  },
];
app.use(bodyParser.json()); // express.json()?

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  console.log("posting");
  const newTask = req.body;

  const lastId = tasks.length === 0 ? 0 : tasks[tasks.length - 1].id;
  const newId = lastId + 1;

  tasks.push({ ...newTask, id: newId });
  res.json(newTask);
});

app.delete("/task/:id", (req, res) => {
  const deletedTaskId = Number(req.params.id);
  const newTasks = tasks.filter((task) => task.id !== deletedTaskId);

  tasks = newTasks;
  res.json({ message: "delete successful" });
});

app.put("/task/:id", (req, res) => {
  const editedTaskId = Number(req.params.id);
  const updatedTask = req.body;
  tasks.map((task) => {
    if (task.id !== editedTaskId) return task;

    task = updatedTask;

    return task;
  });
  const editedTask = tasks.find((task) => task.id === editedTaskId);
  res.json(editedTask);
});

app.listen(port, () => {
  console.log(`Listening ${port}`);
});
