import express, { type Request, type Response } from "express";

export const app = express();
const port = 3000;

// Define a default route that display "Hello, World!" when accessed
app.get("/", (_request: Request, response: Response) => {
  response.send("Hello, World!");
});

// Start the express server and listen on port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
