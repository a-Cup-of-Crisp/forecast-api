import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const HOST: string = process.env.HOST ? process.env.HOST : "localhost";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json("Hello!");
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
