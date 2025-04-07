import express from "express";
import authRouter from "./routes/authRoutes.js";
import 'dotenv/config';
import connectDB from "./databases/mongodb.js";
import providerRouter from "./routes/providerRoutes.js";

const app = express();

const port = 7000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Comfort Service!");
});

app.use("/api/auth", authRouter);
app.use("/api", providerRouter)

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
    await connectDB();
});