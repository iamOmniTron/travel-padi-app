import axios from "axios";
import { SERVER_URL } from "../defaults/utils";
import { AUTH_TOKEN_NAME } from "../defaults/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError, ToastSuccess } from "../utils/toast";

// https://b239-129-205-107-67.ngrok.io

const getToken = async ()=>await AsyncStorage.getItem(AUTH_TOKEN_NAME);

export const useLogin = ()=>{
    const login = async (payload)=>{
        try{
            const {data} = await axios.post(`${SERVER_URL}/login`,{...payload});
            if(!data){
                ToastError("network error");
                return;
            }
            if(!data.success){
                ToastError(data.message);
                return;
            }
            ToastSuccess("login successful");
            return data;
        }catch(err){
            console.log(err)
           ToastError("An error occured");
        }
    }

    return login;
}



export const useSignup = ()=>{
    const signup = async (payload)=>{
        try{
            const {data} = await axios.post(`${SERVER_URL}/signup`,{...payload});
            console.log(data)
            if(!data){
                ToastError("network error")
                return
            }
            if(!data.success){
                ToastError(data.message);
                return;
            }
            ToastSuccess("signup successful");
            return data;
        }catch(err){
            throw err;
        }
    }
    return signup;
}



export const useGetProfile = ()=>{

    const getProfile = async (payload)=>{
        const token = await getToken();
        try{
            const {data} = await axios.get(`${SERVER_URL}/profile`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!data){
                throw "network error";
            }
            if(!data.success){
                throw data.message;
            }
            return data.data;
        }catch(err){
            throw err;
        }
    }

    getProfile;
}