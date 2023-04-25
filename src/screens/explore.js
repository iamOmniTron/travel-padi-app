import {View,Text,TextInput,Image, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlacesContainer from "../components/placesContainer";
import {useState} from "react";
import { API_KEY } from "../defaults/utils";
import { ToastError } from "../utils/toast";
import axios from "axios";
import { THINKING_FACE } from "../defaults/images";


const NoResult = ()=>{


    return(
        <View className="w-full h-60">
            <Image source={THINKING_FACE} className="w-full h-full object-contain"/>
        </View>
    )
}



export default function Explore({navigation}){
    const [places,setPlaces] = useState([]);

    const handleSearchBar = async (text)=>{
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=city&format=json&filter=countrycode:ng&apiKey=${API_KEY}`
        try{
            const {data} = await axios.get(`${url}`);
            setPlaces(data.results)
        }catch(err){
            console.log(err);
            ToastError("Network error");
        }
    }
    return(
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4 mb-10">
            <View className="flex flex-row justify-between items-center">
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="white" />
                </TouchableOpacity>
                <View className="flex flex-row items-center bg-white px-2 rounded-md w-72">
                <Ionicons name="md-search" size={24} color="#3f3f3f"/>
                <TextInput placeholder="Type to search a place" className="px-2" onChangeText={handleSearchBar}/>
                </View>
            </View>
            <View className="mt-4">
                <Text className="text-white text-lg">Search Results</Text>
            </View>
            <View className="mt-7">
                {
                    places.length <1 ? <NoResult/> :
                    <PlacesContainer data={places}/>
                }
            </View>
        </SafeAreaView>
    )
}