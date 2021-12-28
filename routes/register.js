import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "config";
import User from "../models/Users.js";

const registerRouter = express.Router();

// post @api/register
// desc: create a new user
registerRouter.post(
  "/",
  body("name", "Please enter a name").not().isEmpty(),
  body("email", "Please enter a valid email address").isEmail(),
  body("password", "Password should have at least 6 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const user = await new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = hash;

      await user.save();

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

export default registerRouter;
