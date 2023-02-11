const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tasks", { useNewUrlParser: true });
const db = mongoose.connection;
const MongoClient = require("mongodb").MongoClient;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to db"));
db.once("open", () => console.log("Server star to db"));

const newDate = () => {
  const now = new Date();
  return now.toDateString();
};

const daphanimg =
  "https://earthlette.com.au/wp-content/uploads/2016/10/Jem-final-profile-pic-circle2.png";
const omerimg =
  "https://themusclemedics.com/wp-content/uploads/2018/04/Circle-Profile-PNG.png";
const aleximg =
  "https://www.coachcarson.com/wp-content/uploads/2018/09/Chad-Profile-pic-circle.png";
//Mock data
let tasks = [
  {
    id: 1,
    title: "Take out the trash",
    assignee: "Omer",
    creationDate: newDate(),
    status: "New",
    imageSrc: omerimg,
    relatedTasks: [2],
  },
  {
    id: 2,
    title: "Cook dinner",
    assignee: "Alex",
    creationDate: newDate(),
    status: "In Progress",
    imageSrc: aleximg,
    relatedTasks: [1],
  },
  {
    id: 3,
    title: "Clean room",
    assignee: "Daphna",
    creationDate: newDate(),
    status: "New",
    imageSrc: daphanimg,
    parentTask: null,
    relatedTasks: [],
  },
  {
    id: 4,
    title: "Make cake",
    assignee: "Omer",
    creationDate: newDate(),
    status: "Done",
    imageSrc: omerimg,
    relatedTasks: [2],
  },
  {
    id: 5,
    title: "Buy gift",
    assignee: "Alex",
    creationDate: newDate(),
    status: "In Progress",
    imageSrc: aleximg,
    relatedTasks: [1],
  },
  {
    id: 6,
    title: "Clean room 2",
    assignee: "Daphna",
    creationDate: newDate(),
    status: "Done",
    imageSrc: daphanimg,
    parentTask: null,
    relatedTasks: [],
  },
  {
    id: 7,
    title: "Get mail",
    assignee: "Omer",
    creationDate: newDate(),
    status: "Done",
    imageSrc: omerimg,
    relatedTasks: [2],
  },
  {
    id: 8,
    title: "Order from amazon",
    assignee: "Alex",
    creationDate: newDate(),
    status: "In Progress",
    imageSrc: aleximg,
    relatedTasks: [1],
  },
  {
    id: 9,
    title: "Water plants",
    assignee: "Daphna",
    creationDate: newDate(),
    status: "Done",
    imageSrc: daphanimg,
    parentTask: null,
    relatedTasks: [],
  },
  {
    id: 10,
    title: "Do homework",
    assignee: "Omer",
    creationDate: newDate(),
    status: "Done",
    imageSrc: omerimg,
    relatedTasks: [2],
  },
  {
    id: 11,
    title: "Clean sofa",
    assignee: "Alex",
    creationDate: newDate(),
    status: "In Progress",
    imageSrc: aleximg,
    relatedTasks: [1],
  },
  {
    id: 12,
    title: "Clean floor",
    assignee: "Daphna",
    creationDate: newDate(),
    status: "Done",
    imageSrc: daphanimg,
    parentTask: null,
    relatedTasks: [],
  },
];

const pickImg = (updatedTask) => {
  if ((updatedTask.assignee = ""))
    return "https://icons-for-free.com/iconfiles/png/512/avata…le+male+profile+user+icon-1320196710301016992.png";
  if ((updatedTask.assignee = "Daphna")) return daphanimg;
  if ((updatedTask.assignee = "Alex")) return aleximg;
  if ((updatedTask.assignee = "Omer")) return omerimg;
};
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;
  newTask.creationDate = newDate();
  if ((newTask.imageSrc = ""))
    newTask.imageSrc =
      "https://earthlette.com.au/wp-content/uploads/2016/10/Jem-final-profile-pic-circle2.png";
  if ((newTask.imageSrc = "Daphna")) newTask.imageSrc = daphanimg;
  if ((newTask.imageSrc = "Alex")) {
    newTask.imageSrc = aleximg;
  }
  if ((newTask.imageSrc = "Omer")) {
    newTask.imageSrc = omerimg;
  }

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

  //updatedTask.imageSrc = pickImg(updatedTask);
  tasks = tasks.map((task) => {
    if (task.id !== editedTaskId) return task;
    return updatedTask;
  });

  const editedTask = tasks.find((task) => task.id === editedTaskId);
  res.json(editedTask);
});

app.listen(port, () => {
  console.log(`Listening ${port}`);
});
