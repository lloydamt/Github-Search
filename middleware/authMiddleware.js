import jwt from "jsonwebtoken";
import config from "config";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authentication failed" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.err(err.message);
    return res.status(401).json({ msg: "Authentication failed" });
  }
};

export default authMiddleware;
