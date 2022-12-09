import express from "express";
import { Request, Response } from "express";

const PORT: number = 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
