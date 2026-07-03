const jwt = require("jsonwebtoken");
const config = require("../Config/config");

async function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in ❌",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = authMiddleware;
