import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "config";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/Users.js";

const authRouter = express.Router();

// gett @api/auth
// desc: get an existing user
// private
authRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// post @api/auth
// desc: login an existing user
// Public
authRouter.post(
  "/",
  body("email", "Please enter a valid email address").isEmail(),
  body("password", "enter a password").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ msg: "User does not exist" });
      }

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default authRouter;
