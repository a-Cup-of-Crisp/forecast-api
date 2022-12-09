import fetch from "node-fetch"

export class WeatherProvider {
    static async getWeather(lat: string, lon: string) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f0f8250a24f84c1bb693095488b4830a`);    
        return response.json();
    }
}