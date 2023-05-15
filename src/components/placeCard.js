import { View,Image,Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import { getPlaceImage } from "../hooks/places";
import { useNavigation } from "@react-navigation/native";



export default function PlaceCard({place}){
    const [image,setImage] = useState("");

    const navigation = useNavigation();
    useEffect(()=>{
        const getImage = async()=>{
            const {width,photo_reference} = place.photos[0];
            const pic = await getPlaceImage(photo_reference,width);
            setImage(pic);
        }
        getImage();
    },[])


    return(
        <TouchableOpacity className="h-64 w-64 bg-white rounded-md mx-3 mb-2" style={{elevation:10}} onPress={()=>navigation.navigate("SearchedPlace",place)}>
            <View className="h-3/4">
                {
                    image && 
                <Image source={{uri:image}} className="w-full h-full object-cover rounded-md"/>
                }
            </View>
            <View className="pl-2 pb-4">
                <Text className="font-bold">
                    {place.name}
                </Text>
                <View className="flex flex-row">
                <Ionicons name="location" size={18} color={"red"}/>
                <Text>{place.vicinity.length > 20 ? `${place.vicinity.slice(0,20)}...` : place.vicinity}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}