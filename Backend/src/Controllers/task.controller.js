const taskModel = require("../Models/task.model");

async function create(req, res) {
  const { title, description, subject } = req.body;

  const userId = req.user;

  const task = await taskModel.create({
    title,
    description,
    subject,
    user: userId,
  });

  res.status(201).json({
    message: "Task created successfully ✅",
  });
}

async function getAllTasks(req, res) {
  const user = req.user;

  const tasks = await taskModel.find({ user });

  res.status(200).json({
    tasks: tasks,
  });
}

async function toggleStatus(req, res) {
  const { id } = req.params;

  const task = await taskModel.findById(id);

  if (task.status === "pending") {
    task.status = "completed";
  } else {
    task.status = "pending";
  }

  await task.save();

  res.status(200).json({
    message: "Status toggled ✅",
  });
}

async function deleteTask(req, res) {
  const { id } = req.params;

  const task = await taskModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Task deleted succesfully ✅",
  });
}

async function getTask(req, res) {
  const { id } = req.params;

  const task = await taskModel.findOne({ _id: id });

  res.status(200).json({
    task,
  });
}

module.exports = { create, getAllTasks, toggleStatus, deleteTask, getTask };
