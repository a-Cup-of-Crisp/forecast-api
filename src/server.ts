import express from "express";
import { Request, Response, urlencoded, json } from "express";
import cors from "cors";
import { WeatherProvider } from "./weather-provider/weather.provider";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const HOST: string = process.env.HOST ? process.env.HOST : "localhost";
const REDIS_URL = process.env.REDIS_URL
  ? process.env.REDIS_URL
  : "redis://default:redispw@localhost:49153";

const client = createClient({ url: REDIS_URL });
client.on("error", (err) => console.log("Redis Client Error", err));

const app = express();

app.use(cors());
app.use(urlencoded());
app.use(json());

app.get("/getWeather", async (req: Request, res: Response) => {
  // отправка данных из Redis
  let data = await client.get("ireland");

  res.send(data);
});

app.listen(PORT, HOST, async () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
  await client.connect();
  await WeatherProvider.getWeather(client);
});
