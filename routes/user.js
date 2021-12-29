import express from "express";
import axios from "axios";

const userRouter = express.Router();

userRouter.get("/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}?token=${process.env.token}`
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default userRouter;
