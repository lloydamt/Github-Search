import express from "express";
import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());
app.use("/api/register", registerRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
