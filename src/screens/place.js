import { SafeAreaView,TouchableOpacity,Text, View,Modal} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import {useEffect, useState} from "react";
import { useAddLocation, useBookmark } from "../hooks/user";
import { ToastError } from "../utils/toast";



export default function Place({route}){
    const [placeId,setPlaceId] = useState("");
    const [isOpened,setIsOpened] = useState(false);

    const navigation = useNavigation();
    const {place} = route.params;

    const addLocation = useAddLocation();
    const bookmarkPlace = useBookmark();

    useEffect(()=>{
        const saveLocation = async()=>{
            const payload = {
                longitude:place.lon,
                latitude:place.lat,
                address:place.formatted,
                category:place.category,
                state:place.state,
                city:place.city
            };
            const response = await addLocation(payload);
            console.log(response);
            setPlaceId(response);
        }
        saveLocation();
    },[]);

    const handleBookmark = async ()=>{
        const response = await bookmarkPlace(placeId);
        if(!response){
            ToastError("Network error");
            return;
        }
        return;
    }
    
    return(
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4 mb-10">
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="white" />
                </TouchableOpacity>
            </View>
            {/* Image container */}
            <View className="mt-4 h-40 w-full rounded-md bg-white" style={{elevation:10}}>
                <MapView
                    className="h-full w-full"
                    initialRegion={{
                      latitude: place.lat,
                      longitude: place.lon,
                      latitudeDelta: 0.0422,
                      longitudeDelta: 0.0221,
                    }}
                    >
                        <Marker coordinate={{
                            latitude:place.lat,
                            longitude:place.lon
                        }}>
                        <Ionicons name="location-sharp" size={24} color="red" />
                        </Marker>
                    </MapView>
                <TouchableOpacity className="absolute top-28 bg-blue-500 px-3 py-2 rounded-md left-52" onPress={handleBookmark}>
                    <Text className="font-bold text-white">Bookmark</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-4">
                <Text className="text-lg font-bold text-white">Information:</Text>
                <View className="ml-3 mt-2">
                <View className="mb-5 flex flex-row ">
                        <Text className="font-bold text-18">Place Category:</Text><Text  className="ml-3 font-bold">{place.category}</Text>
                    </View>
                    <View className="mb-5 flex flex-row pr-4">
                        <Text className="font-bold text-18">Address:</Text><Text className="ml-3 font-bold whitespace-normal">{place.formatted}</Text>
                    </View>
                    <View className="mb-5 flex flex-row pr-4">
                        <Text className="font-bold text-18">City:</Text><Text  className="ml-3 font-bold">{place.county}</Text>
                    </View>
                    <View className="flex flex-row pr-4">
                        <Text className="font-bold text-18">State:</Text><Text className="ml-3 font-bold whitespace-normal">{place.state}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity className="mt-8 rounded-md bg-blue-500 px-4 py-4" onPress={()=>setIsOpened(true)}>
                <Text className="text-white font-bold text-24 text-center">Make a review</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}