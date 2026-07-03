const noteModel = require("../Models/note.model");

async function createNote(req, res) {
  const { title, subject, content } = req.body;

  const userId = req.user;

  const note = await noteModel.create({
    title,
    subject,
    content,
    user: userId,
  });

  res.status(201).json({
    message: "Note created successfully ✅",
  });
}

async function updateNote(req, res) {
  const { id } = req.params;

  const { title, content, subject } = req.body;

  const note = await noteModel.findByIdAndUpdate(id, {
    title,
    content,
    subject,
  });

  res.status(201).json({
    message: "Note updated successfully ✅",
  });
}

async function getNote(req, res) {
  const { id } = req.params;

  const note = await noteModel.findById(id);

  res.status(200).json({
    note: note,
  });
}

async function deleteNote(req, res) {
  const { id } = req.params;

  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully ✅",
  });
}

async function getAllNotes(req, res) {
  const user = req.user;

  const notes = await noteModel.find({
    user: user,
  });

  res.status(200).json({
    notes: notes,
  });
}

module.exports = { createNote, getNote, updateNote, deleteNote, getAllNotes };
