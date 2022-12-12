import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.API_KEY;
const interval = 3600000;

const cities = [
  ["53.3497", "-6.2603"],
  ["51.9", "-8.4731"],
  ["53.2729", "-9.0418"],
  ["52.6653", "-8.6238"],
  ["52.2583", "-7.119"],
  ["53.7139", "-6.3503"],
  ["54.009", "-6.4049"],
  ["53.4597", "-6.2181"],
  ["53.3015", "-6.1778"],
  ["52.2675", "-9.6962"],
  ["52.8306", "-6.9317"],
  ["52.8463", "-8.9807"],
  ["53.3", "-6.14"],
  ["52.6477", "-7.2561"],
  ["53.2158", "-6.6669"],
  ["54.2667", "-8.4833"],
  ["54.2479", "-6.9708"],
  ["53.6333", "-8.1833"],
  ["53.5333", "-7.35"],
  ["53.2878", "-6.3411"],
  ["52.9779", "-6.033"],
  ["52.355", "-7.7039"],
  ["52.3342", "-6.4575"],
  ["53.727", "-7.7998"],
  ["53.555", "-6.7917"],
  ["53.9469", "-8.09"],
  ["53.2667", "-7.5"],
  ["52.8619", "-8.1967"],
  ["53.9908", "-7.3606"],
  ["53.0309", "-7.3008"],
  ["53.85", "-9.3"],
  ["54.8356", "-7.4779"],
];

export class WeatherProvider {
  static async setGetWeatherInterval(client) {
    this.getWeather(client);
    setInterval(this.getWeather, interval, client);
  }

  static async getWeather(client) {
    let ireland = [];
    for (let city of cities) {
      const [lat, lon] = city;
      console.log(lat, lon);

      const response = await callOWM(lat, lon);
      let data = await response.json();
      console.log(data);
      data = parse(data);

      const req = await fetch("http://ai:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const content = await req.json();
      ireland.push(content);
    }
    console.log(ireland);
    await client.set("IE", ireland.join("|"));
  }
}

async function callOWM(lat: string, lon: string) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,alerts,minutely&appid=${API_KEY}`
  );
}

function parse(data: any): any {
  return {
    date_and_time: data.current["dt"],
    precipitation_amount: data.current["humidity"],
    air_temperature: data.current["temp"] - 273,
    wet_bulb_temp: 0,
    dew_point_temp: data.current["dew_point"] - 273,
    relative_humidity: data.current["humidity"],
    mean_wind_speed: data.current["wind_speed"],
    strong_wind: 0,
    squall: 0,
    blizzard: 0,
    heavy_rain: 0,
    shower: 0,
    snow: 0,
    hail: 0,
    fog: 0,
    ice: 0,
  };
}
