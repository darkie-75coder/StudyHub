const express = require("express");
const authMiddleware = require("../Middlewares/auth.middleware");
const subjectController = require("../Controllers/subject.controller");

const router = express.Router();

router.post("/create", authMiddleware, subjectController.createSubject);

router.get("/get-subjects", authMiddleware, subjectController.getAllSubjects);

router.delete("/delete/:id", authMiddleware, subjectController.deleteSubject);

module.exports = router;
