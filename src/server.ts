import express from "express";
import { Request, Response } from "express";
import { WeatherProvider } from "./weather-provider/weather.provider";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const HOST: string = process.env.HOST ? process.env.HOST : "localhost";
const app = express();

app.get("/getWeather", async (req: Request, res: Response) => {
  let data = await WeatherProvider.getWeather("48.480311", "135.071756");

  res.send(data);
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
