import express from "express";
import axios from "axios";

const reposRouter = express.Router();

reposRouter.get("/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&token=${process.env.token}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default reposRouter;
