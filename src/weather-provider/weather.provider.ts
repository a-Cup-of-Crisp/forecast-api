import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.API_KEY;

export class WeatherProvider {
  static async getWeather(lat: string, lon: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    const mapped = {
      date_and_time: response.current["dt"],
      precipitation_amount: response.current["humidity"],
      air_temperature: response.current["temp"] - 273,
      wet_bulb_temp: 0,
      dew_point_temp: response.current["dew_point"] - 273,
      relative_humidity: response.current["humidity"],
      vapour_pressure: 0,
      mean_sea_level_pressure: 0,
      mean_wind_speed: response.current["wind_speed"],
      predominant_wind_direct: 0,
      sunshine_duration: 0,
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

    return mapped;
  }
}
