import {Text,View,TouchableOpacity, TextInput, ScrollView, SafeAreaView,ActivityIndicator} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState,useCallback } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getcurrentLocationApi, getcurrentLocationWeather } from "../utils/helper";
import axios from "axios";
import * as Location from "expo-location";
import { ToastError } from "../utils/toast";
import { GOOGLE_API_KEY } from "../defaults/utils";
import { WELCOME } from "../defaults/images";
import { getNearbyPlaces, getPlaceTypes } from "../hooks/places";
import Center from "../components/center";
import HomePlacesContainer from "../components/homePlacesContainer";
import RecommendedPlacesContainer from "../components/recommendedPlacesContainer";
import currentLocationStore from "../store/currentLocationStore";



export default function Home({navigation,route}){
    const [type,setType] = useState("lodging");
    const [places,setPlaces] = useState([]);
    const [loading,setLoading] = useState(false);

    const location = currentLocationStore(state=>state.currentLocation);
    const setTypeCB = useCallback((t)=>setType(t),[type]);


    useEffect(()=>{
        const getNearByPlaces = async ()=>{
            setLoading(true);
            const {coords} = location;
            try{
                const data = await getPlaceTypes(coords.longitude,coords.latitude,type);
                setPlaces(data.results);
            }catch(err){
                return;
            }finally{
                setLoading(false);
                return;
            }
        }

        getNearByPlaces()
    },[type])
    return (
        <SafeAreaView className="flex-1 px-4 pt-4">
           
                {/* Search bar */}
                <View className="mb-5 flex-row mx-4 py-1">
                        <GooglePlacesAutocomplete
                            placeholder='Type to search a place'
                            onPress={(data,details) => {
                                return navigation.navigate("SearchedCity",details)
                            }}
                            query={{
                                key: GOOGLE_API_KEY,
                                language: 'en',
                                components: 'country:ng',
                                type:"(cities)"
                            }}
                            style={{elevation:10}}
                            className="z-40"
                            fetchDetails={true}
                            onFail={(e)=>console.log(e)}
                            onTimeout={()=>console.log("time out")}
                            />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                <ScrollView className="mt-10 flex space-x-5" horizontal showsHorizontalScrollIndicator={false}>
                <Center type={"tourist attraction"} icon="airplane-outline" callback={()=>setTypeCB("tourist_attraction")}/>
                    <Center type="resturant" icon="fast-food-outline" callback={()=>setTypeCB("resturant")}/>
                    <Center type="hospital" icon="medical-outline" callback={()=>setTypeCB("hospital")}/>
                    <Center type="hotel" icon="home-outline" callback={()=>setTypeCB("lodging")}/>
                    <Center type="gym" icon="barbell" callback={()=>setTypeCB("gym")}/>
                    <Center type="police" icon="flag" callback={()=>setTypeCB("police")}/>
                    <Center type="store" icon="cart" callback={()=>setTypeCB("shopping_mall")}/>
                </ScrollView>
                <Text className="font-bold text-lg mt-5 text-gray-700">Nearby places</Text>
                {
                   loading ?
                    <ActivityIndicator/>:
                    <HomePlacesContainer places={places}/>
                }
                <Text className="font-bold text-lg mt-2 text-gray-700">Recommended</Text>
            <RecommendedPlacesContainer/>
            </ScrollView>
        </SafeAreaView>
    )
}