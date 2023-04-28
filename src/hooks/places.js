import { ToastError } from "../utils/toast"
import { GOOGLE_API_KEY } from "../defaults/utils";
import axios from "axios";


export const getNearbyPlaces = async (lat,lon,type="tourist_attraction")=>{
        try{
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%${lon}&radius=1500&type=${type}&key=${GOOGLE_API_KEY}`;
            const {data} = await axios.get(url);
            console.log(data)
            return data?.results;
        }catch(err){
            console.log(err);
            ToastError("network error");
        }
}


export const getPlaceDetails = async (googlePlaceId)=>{
    try{
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=name%2Cadr_address%2Cphoto%2Cformatted_address%2Cgeometry%2Ctype%2Crating%2Creviews&key=${GOOGLE_API_KEY}`;
        const {data} = await axios.get(url);
        return data?.result;
    }catch(err){
        console.log(err);
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
        console.log("error",err);
        ToastError("Network error");
    }
}


export const getDistance = async (myLon,myLat,placeLon,placeLat)=>{
    try{
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${myLat},${myLon}&destination=${placeLat},${placeLon}&key=${GOOGLE_API_KEY}`;
        console.log(url)
        const {data} = await axios.get(url);
        console.log("result",data)
        return data;
    }catch(err){
        console.log(err);
        ToastError("Network error");
    }
}