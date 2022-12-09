export interface WeatherResult {
    temp: number;
    pressure: number;
    humidity: number;
    visibility: number;
    wind_speed: number;
    cloudiness: number;
    rain?: number;
    snow?: number;
}