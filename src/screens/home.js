import {Text,View,TouchableOpacity, TextInput, ScrollView} from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect,useState,useContext } from "react";
import LocationContext from "../context/locationContext";
import { getcurrentLocationApi } from "../utils/helper";
import axios from "axios";
import { ToastError } from "../utils/toast";
import { API_KEY } from "../defaults/utils";



export default function Home({navigation}){

    const {location:currentLocationInfo} = useContext(LocationContext);
    const handleSearchBar = async (text)=>{
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=city&format=json&filter=countrycode:ng&apiKey=${API_KEY}`
        try{
            const {data} = await axios.get(`${url}`);
            console.log(data.results);
        }catch(err){
            ToastError("Network error");
        }
    }

    useEffect(()=>{
        console.log(currentLocationInfo);
        // const {longitude,latitude} = currentLocationInfo.coords;
        // const getLocation = async ()=>{
        //     const response = await getcurrentLocationApi(longitude,latitude);
        //     console.log(response);
        // }
        // getLocation
    },[])

    return (
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4">
            <View className="flex flex-row mb-2" style={{elevation:100}}>
                <View className="mr-2 flex-none">
                    <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                        <FontAwesome5 name="user-circle" size={30} color="#3f3f3f" />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center bg-white px-2 rounded-md w-72">
                    <FontAwesome5 name="search" size={15} color="#3f3f3f" />
                <TextInput placeholder="search a location" className="px-2" onChangeText={handleSearchBar}/>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="pb-10">
            {/* Image area */}
            <View className="mt-10">
                <View className="h-52 w-full rounded-md bg-white">

                </View>
            </View>
            {/* Info section */}
            <View className="mt-3 flex flex-row justify-between">
                {/* Location name */}
                <View className="w-1/2">
                    <Text className="text-[24] font-bold text-white">
                        Abuja, Federal Capital Territory, Nigeria
                    </Text>
                </View>
                <View className="flex">
                    {/* Weather section */}
                    <FontAwesome5 name="cloud-rain" size={24} color="lightgray" />
                    <Text className="text-[10px]">12 deg</Text>
                </View>
            </View>
            {/* Details Section */}
            <View className="mt-3 bg-white rounded-md h-36 px-2">
                <Text className="font-semibold">
                    This is your current location, this is also a mock data
                </Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}