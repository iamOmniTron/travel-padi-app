import { create } from "zustand";
import { AUTH_TOKEN_NAME, SERVER_URL, USER_STORE_KEY } from "../defaults/utils";
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastError } from "../utils/toast";

// const getToken = async ()=>await AsyncStorage.getItem(AUTH_TOKEN_NAME);
// const token = getToken();

export const getUserApi = async (t)=>{
    try{
        const {data} = await axios.get(`${SERVER_URL}/profile`,{
            headers:{
                "Authorization":`Bearer  ${t}`
            }
        });
        console.log(data);
        return data;
    }catch(err){
        ToastError("error authenticating user")
    }
}


const userStore = create(
    persist((set)=>({
        user:{},
        setUser:(profile)=>set(()=>({user:{...profile}})),
        logout:()=>set(()=>({user:{}}))
    }),
    {
        name:USER_STORE_KEY,
        storage:createJSONStorage(()=>AsyncStorage)
    }
    )
)

export default userStore;