const express = require("express");
const authMiddleware = require("../Middlewares/auth.middleware");
const taskController = require("../Controllers/task.controller");

const router = express.Router();

router.post("/create", authMiddleware, taskController.create);

router.get("/get-tasks", authMiddleware, taskController.getAllTasks);

router.delete("/delete/:id", authMiddleware, taskController.deleteTask);

router.get("/getTask/:id", authMiddleware, taskController.getTask);

router.patch("/toggle/:id", authMiddleware, taskController.toggleStatus);

module.exports = router;
