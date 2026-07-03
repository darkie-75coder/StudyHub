const subjectModel = require("../Models/subject.model");

async function createSubject(req, res) {
  const { name, color } = req.body;

  const userId = req.user;

  const user = await subjectModel.create({
    name,
    color,
    user: userId,
  });

  res.status(201).json({
    message: "Subject created successfully ✅",
  });
}

async function deleteSubject(req, res) {
  const { id } = req.params;

  const subject = await subjectModel.findByIdAndDelete(id);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found ❌",
    });
  }

  res.status(200).json({
    message: "Subject deleted successfully ✅",
  });
}

async function getAllSubjects(req, res) {
  const userId = req.user;

  const subjects = await subjectModel.find({ user: userId });

  res.status(200).json({
    subjects: subjects,
  });
}

module.exports = { createSubject, deleteSubject, getAllSubjects };
