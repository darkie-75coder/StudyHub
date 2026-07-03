const express = require("express");
const authMiddleware = require("../Middlewares/auth.middleware");
const noteController = require("../Controllers/note.controller");

const router = express.Router();

router.post("/create", authMiddleware, noteController.createNote);

router.put("/update/:id", authMiddleware, noteController.updateNote);

router.get("/get-notes", authMiddleware, noteController.getAllNotes);

router.get("/getNote/:id", authMiddleware, noteController.getNote);

router.delete("/delete/:id", authMiddleware, noteController.deleteNote);

module.exports = router;
