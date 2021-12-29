import express from "express";
import axios from "axios";

const searchRouter = express.Router();

searchRouter.get("/:input", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?token=${process.env.token}&q=${req.params.input}`
    );
    res.json(response.data.items);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default searchRouter;
