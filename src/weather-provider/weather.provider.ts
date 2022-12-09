import fetch from "node-fetch";

const API_KEY = process.env.API_KEY;

export class WeatherProvider {
  static async getWeather(lat: string, lon: string) {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.json();
  }
}
