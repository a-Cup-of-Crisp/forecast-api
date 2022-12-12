import express from "express";
import { Request, Response, urlencoded, json } from "express";
import cors from "cors";
import { WeatherProvider } from "./weather-provider/weather.provider";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const HOST: string = process.env.HOST ? process.env.HOST : "localhost";
const app = express();

app.use(cors());
app.use(urlencoded());
app.use(json());
app.get("/getWeather", async (req: Request, res: Response) => {
  let data = await WeatherProvider.getWeather("55.677466", "41.395744");

  const result = await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  res.send(data);
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
