import {Text,View,TouchableOpacity, TextInput, ScrollView, Image} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState, } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getcurrentLocationApi, getcurrentLocationWeather } from "../utils/helper";
import axios from "axios";
import * as Location from "expo-location";
import { ToastError } from "../utils/toast";
import { GOOGLE_API_KEY } from "../defaults/utils";
import currentLocationStore from "../store/currentLocationStore";
import { WELCOME } from "../defaults/images";
import { getNearbyPlaces } from "../hooks/places";
import Center from "../components/center";
import HomePlacesContainer from "../components/homePlacesContainer";
import RecommendedPlacesContainer from "../components/recommendedPlacesContainer";



export default function Home({navigation}){
    return (
        <SafeAreaView className="flex-1 px-4 pt-4">
                {/* Search bar */}
                <View className="mb-4">
                        <GooglePlacesAutocomplete
                            placeholder='Type to search a place'
                            onPress={(data,details=null) => {
                                console.log("details",details)
                            }}
                            query={{
                                language: 'en',
                                components: 'country:ng',
                            }}
                            className="w-full h-full"
                            style={{elevation:10}}
                            fetchDetails={true}
                            />
                </View>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Icons Section */}
                <View className="w-full px-5 flex justify-between flex-row mt-10">
                    <Center icon="airplane-outline" callback={()=>console.log("hey")}/>
                    <Center icon="fast-food-outline" callback={()=>console.log("hey")}/>
                    <Center icon="location-outline" callback={()=>console.log("hey")}/>
                    <Center icon="home-outline" callback={()=>console.log("hey")}/>
                </View>
                {/* Places in current city */}
                <Text className="font-bold text-lg mt-5 text-gray-700">places</Text>
                <HomePlacesContainer/>
                <Text className="font-bold text-lg mt-2 text-gray-700">Recommended</Text>
                <RecommendedPlacesContainer/>
            </ScrollView>
        </SafeAreaView>
    )
}