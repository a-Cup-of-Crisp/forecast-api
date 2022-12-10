import express from "express";
import { Request, Response, urlencoded, json } from "express";
import cors from "cors";
import { WeatherProvider } from "./weather-provider/weather.provider";
import dotenv from "dotenv";
import { createClient } from 'redis';

dotenv.config();

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const HOST: string = process.env.HOST ? process.env.HOST : "localhost";
const REDIS_URL = process.env.REDIS_PORT;

const app = express();

app.use(cors());
app.use(urlencoded());
app.use(json());

app.get("/getWeather", async (req: Request, res: Response) => {
  const lat = req.query.lat as string,
    lon = req.query.lon as string;

  let data = await WeatherProvider.getWeather(lat, lon);

  res.send(data);
});

app.listen(PORT, HOST, async () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);

  await WeatherProvider.getWeather('55.814144', '37.615294');
  console.log('Операция вызвана');
});
