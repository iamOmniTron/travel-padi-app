import { ToastError } from "./toast"
import { API_KEY } from "../defaults/utils";
import axios from "axios";



export const getcurrentLocationApi = async (long,lat)=>{
    try{
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&type=city&format=json&apiKey=${API_KEY}`;
        const {data} = await axios.get(url);
        console.log(data);
    }catch(err){
        ToastError("network error")
    }
}