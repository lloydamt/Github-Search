import express from "express";
import cors from "cors";
import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import searchRouter from "./routes/search.js";
import userRouter from "./routes/user.js";
import reposRouter from "./routes/repos.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/register", registerRouter);
app.use("/api/auth", authRouter);
app.use("/api/search", searchRouter);
app.use("/api/users", userRouter);
app.use("/api/repos", reposRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
