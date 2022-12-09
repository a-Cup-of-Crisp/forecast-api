import express from "express";
import { Request, Response } from "express";
import { WeatherProvider } from "./weather-provider/weather.provider";

const PORT: number = 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json("Hello!");
});

app.get("/getWeather", async (req: Request, res: Response) => {
  let data = await WeatherProvider.getWeather('48.480311', '135.071756');

  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
