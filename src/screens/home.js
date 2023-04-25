import {Text,View,TouchableOpacity, TextInput, ScrollView} from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState, } from "react";
import { getcurrentLocationApi } from "../utils/helper";
import axios from "axios";
import { ToastError } from "../utils/toast";
import { API_KEY } from "../defaults/utils";
import currentLocationStore from "../store/currentLocationStore";



export default function Home({navigation}){
    const [currentLocation,setCurrentLocation] = useState({});
    
    // useEffect(()=>{
    //     const currentLocationInfo = currentLocationStore(state=>state.currentLocation);
    //     const {longitude,latitude} = currentLocationInfo?.coords;
    //     const getLocation = async ()=>{
    //         const response = await getcurrentLocationApi(longitude,latitude);
    //         console.log(response);
    //         setCurrentLocation({...response});
    //     }
    //     getLocation();
    // },[])

    return (
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4">
            <View className="flex flex-row mb-2" style={{elevation:100}}>
                <View className="mr-2 flex-none">
                    <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                        <FontAwesome5 name="user-circle" size={30} color="#3f3f3f" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className="flex flex-row items-center bg-white px-2 rounded-md w-72" onPress={()=>navigation.navigate("Explore")}>
                    <FontAwesome5 name="search" size={15} color="#3f3f3f" />
                {/* <TextInput placeholder="search a location" className="px-2"/> */}
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
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
                    <Text className="text-[10px] text-white">12 deg</Text>
                </View>
            </View>
            {/* Details Section */}
            <Text className="text-white mt-10 font-bold text-lg">Recommended</Text>
            <View className="mt-3 bg-white rounded-md h-36 px-2">
                
            </View>
            <View className="mt-3 bg-white rounded-md h-36 px-2">
                
            </View>
            <View className="mt-3 bg-white rounded-md h-36 px-2">
                
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}