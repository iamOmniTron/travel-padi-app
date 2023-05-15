import { ToastError } from "../utils/toast"
import { GOOGLE_API_KEY } from "../defaults/utils";
import axios from "axios";


export const getNearbyPlaces = async (lat,lon,type="tourist_attraction")=>{
        try{
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%${lon}&radius=5000&type=${type}&key=${GOOGLE_API_KEY}`;
            const {data} = await axios.get(url);
            return data?.results;
        }catch(err){
            ToastError("network error");
        }
}


export const getPlaceDetails = async (googlePlaceId)=>{
    try{
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=opening_hours%2Cname%2Cadr_address%2Cphoto%2Cformatted_address%2Cgeometry%2Ctype%2Crating%2Creviews%2Cformatted_phone_number&key=${GOOGLE_API_KEY}`;
        const {data} = await axios.get(url);
        return data?.result;
    }catch(err){
        ToastError("Network error");
    }
}



export const getPlaceImage = async (photoRef,width) =>{
    try{
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${photoRef}&key=${GOOGLE_API_KEY}`
    
        const {request} = await axios.get(url,{
            headers:{
                "Content-Type":"image/jpeg"
            }
        });
        return request.responseURL;
    }catch(err){
        ToastError("Network error");
    }
}


export const getDistance = async (myLon,myLat,placeLon,placeLat)=>{
    try{
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${myLat},${myLon}&destination=${placeLat},${placeLon}&key=${GOOGLE_API_KEY}`;
        const {data} = await axios.get(url);
        return data;
    }catch(err){
        ToastError("Network error");
    }
}



export const getPlaceTypes = async (lon,lat,type)=>{
    try{
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lon}&radius=2000&type=${type}&key=${GOOGLE_API_KEY}`;
        const {data} = await axios.get(url);
        return data;
    }catch(err){
        ToastError("Network Error");
    }
}