import express from "express";
import fs from "node:fs";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.get("/contact", (req, res) => {
  res.send(`
    <form method="POST" action="/contact">
      <input type="text" name="name" placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/contact", (req, res) => {
  const body = new URLSearchParams(req.body).toString();
  console.log(body);
  fs.appendFileSync("./submissions.txt", body + "\n");
  res.send(body);
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
