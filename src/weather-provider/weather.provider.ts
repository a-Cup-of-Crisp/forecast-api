import fetch from "node-fetch";
import dotenv from "dotenv";
import { WeatherResult } from "./weather-result.dto";

dotenv.config();
const API_KEY = process.env.API_KEY;

export class WeatherProvider {
  static async getWeather(lat: string, lon: string) {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    let data = await response.json();
    data = parse(data);

    return mapping(data);
  }
}

function parse(data: any): any {    
    data.main.temp = toCelsius(data.main.temp);
    data.main.pressure = toTorr(data.main.pressure * 0.750064);

    return data;
}

function mapping(data: any): WeatherResult {
    let result: WeatherResult = {
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: data.visibility,
        wind_speed: data.wind.speed,
        cloudiness: data.clouds.all,
        rain: data.rain,
        snow: data.snow
    }
    return result;
}

function toCelsius(val: number): number {
    return Number((val - 273).toFixed(2));
}

function toTorr(val: number): number {
    return Number((val * 0.750064).toFixed(2));
}