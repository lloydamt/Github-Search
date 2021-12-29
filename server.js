import express from "express";
import * as path from "path";
import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import searchRouter from "./routes/search.js";
import userRouter from "./routes/user.js";
import reposRouter from "./routes/repos.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api/register", registerRouter);
app.use("/api/auth", authRouter);
app.use("/api/search", searchRouter);
app.use("/api/users", userRouter);
app.use("/api/repos", reposRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
