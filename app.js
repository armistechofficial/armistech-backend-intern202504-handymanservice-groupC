import express from "express";

const app = express();

const port = 7000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Node js course!");
});

/* Need to step up database */
app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
//    await connectDB();
});