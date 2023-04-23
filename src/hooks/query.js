import axios from "axios";
import { AUTH_TOKEN_NAME } from "../defaults/utils";

// const token = localStorage.getItem(AUTH_TOKEN_NAME);


export const queryServer = async (url)=>{
    try{
        const {data:response} = await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response;
    }catch(err){
        throw err;
    }
}


export const query = async (url)=>{
    try{
        const data = await axios.get(url);

        return data;
    }catch(err){
        throw err;
    }
}