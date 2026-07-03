const express = require("express");
const userController = require("../Controllers/user.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", authMiddleware, userController.logout);
router.get("/auth-user", authMiddleware, userController.auth);
router.get("/get-user", authMiddleware, userController.getUser);

module.exports = router;
