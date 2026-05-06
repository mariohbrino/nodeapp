// This will print "Hello, World!" to the console when the script is run.
import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.get("/", (_request: Request, response: Response) => {
  response.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
