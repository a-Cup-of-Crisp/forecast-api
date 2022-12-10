import fetch from "node-fetch";
import dotenv from "dotenv";
import RedisClient from "@redis/client/dist/lib/client";

dotenv.config();
const API_KEY = process.env.API_KEY;
const interval = 5000;

export class WeatherProvider {
    static async getWeather(lat: string, lon: string) {
        let data = null;
        data = await callOWM(lat, lon);   

        setInterval(async () => {
            let response = await callOWM(lat, lon);
            data = await response.json();            
            data = parse(data);

            //let aiResponse = await fetch(``);

        }, interval);
    }
}

async function callOWM(lat: string, lon: string) {
    return await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
}

function parse(data: any): any {    
    data.main.temp = toCelsius(data.main.temp);
    data.main.pressure = toTorr(data.main.pressure * 0.750064);

    return data;
}

function toCelsius(val: number): number {
    return Number((val - 273).toFixed(2));
}

function toTorr(val: number): number {
    return Number((val * 0.750064).toFixed(2));
}