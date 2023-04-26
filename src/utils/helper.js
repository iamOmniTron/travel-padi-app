import { ToastError } from "./toast"
import { API_KEY, WEATHER_API_KEY } from "../defaults/utils";
import axios from "axios";



export const getcurrentLocationApi = async (long,lat)=>{
    try{
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&type=city&format=json&apiKey=${API_KEY}`;
        const {data} = await axios.get(url);
        return data;
    }catch(err){
        ToastError("network error")
    }
}


export const getcurrentLocationWeather = async (lat,lon)=>{
    try{
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=alert,minutely,daily,hourly,&appid=${WEATHER_API_KEY}`
        const {data} = await axios.get(url);
        return data;
    }catch(err){
        ToastError("network error")
    }
}