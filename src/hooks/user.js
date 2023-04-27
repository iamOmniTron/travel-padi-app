import axios from "axios";
import { ToastError,ToastSuccess } from "../utils/toast";
import { SERVER_URL,AUTH_TOKEN_NAME } from "../defaults/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect,useState } from "react";


const getToken = async ()=>{
    const data =  await AsyncStorage.getItem(AUTH_TOKEN_NAME);
    return JSON.parse(data);
}
const token = getToken();

export const useAddLocation =()=>{
    const addLocation = async (payload)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/place/add`,{...payload},{
                headers:{
                    Authorization:`Bearer ${token._j}`
                }
            });
            if(!response){
                ToastError("network error");
                return;
            }
            if(!response.success){
                ToastError(response.message??"Network err");
                return;
            }
            ToastSuccess("Location Added successfully");
            return response.data;
        }catch(err){
            ToastError(err.message??"Something went wrong")
            console.log("error",err)
        }
    }

    return addLocation;
}


export const useBookmark = ()=>{
    const bookmarkPlace = async (placeId)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/bookmark`,{placeId},{
                headers:{
                    Authorization:`Bearer ${token._j}`
                }
            });
            if(!response){
                ToastError("network error");
                return;
            }
            if(!response.success){
                ToastError(data.message);
                return;
            }
            ToastSuccess("Location Bookmarked successfully");
            return response.message;
        }catch(err){
            ToastError(err.message??"Something went wrong")
        }
    }
    return bookmarkPlace;
}


export const useRating = ()=>{
    const ratePlace = async (placeId,rate,review)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/rate/${placeId}`,{ratings:rate,review},{
                headers:{
                    Authorization:`Bearer ${token._j}`
                }
            });
            console.log(response);
            if(!response){
                ToastError("network error");
                return;
            }
            // if(!response.success){
            //     ToastError(response.message);
            //     return;
            // }
            ToastSuccess("Review successfully");
            return response.message;
        }catch(err){
            console.log("rating error",err)
            ToastError(err.message??"Something went wrong")
        }
    }
    return ratePlace;
}


export const useFetchBookmarked = ()=>{
    const [bookmarks,setBookmarks] = useState([]);


    useEffect(()=>{
        const getBookmarks = async ()=>{
            try{
                const {data:response} = await axios.get(`${SERVER_URL}/bookmarks`,{
                    headers:{
                        Authorization:`Bearer ${token._j}`
                    }
                });
                console.log(response);
                if(!response){
                    ToastError("network error");
                    return;
                }
                if(!response.success){
                    ToastError(data.message);
                    return;
                }
                setBookmarks(response.data);
            }catch(err){
                ToastError(err.message??"Something went wrong")
            }
        }
        getBookmarks();
    },[]);

    return bookmarks;
}


export const useFetchRecommended = ()=>{
    const [places,setPlaces] = useState([]);


    useEffect(()=>{
        const getRecommendeds = async ()=>{
            try{
                const {data:response} = await axios.get(`${SERVER_URL}/recommended-places`,{
                    headers:{
                        Authorization:`Bearer ${token._j}`
                    }
                });
                console.log(response);
                if(!response){
                    ToastError("network error");
                    return;
                }
                if(!response.success){
                    ToastError(data.message);
                    return;
                }
                setPlaces(response.data);
            }catch(err){
                ToastError(err.message??"Something went wrong")
            }
        }
        getRecommendeds();
    },[]);

    return bookmarks;
}