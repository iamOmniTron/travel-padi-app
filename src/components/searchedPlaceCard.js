import { View,Image,Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import { getPlaceImage } from "../hooks/places";
import { useNavigation } from "@react-navigation/native";



export default function SearchedPlaceCard({place}){
    const [image,setImage] = useState("");
    console.log(place);
    const navigation = useNavigation();
    useEffect(()=>{
        const getImage = async()=>{
            const {width,photo_reference} = place?.photos[0];
            const pic = await getPlaceImage(photo_reference,width);
            setImage(pic);
        }
        getImage();
    },[])


    return(
        <TouchableOpacity className="h-24 w-11/12 flex flex-row bg-white rounded-md mx-3 mb-2" style={{elevation:10}} onPress={()=>navigation.navigate("SearchedPlace",place)}>
            <View className="h-full w-2/5">
                {
                    image && 
                <Image source={{uri:image}} className="w-full h-full object-cover rounded-md"/>
                }
            </View>
            <View className="px-2 pt-3 w-full">
                <Text className="text-base truncate">
                    {place?.name?.length > 10 ? `${place?.name?.slice(0,10)}...` : place.name}
                </Text>
                <View className="flex flex-row mt-5">
                    <Ionicons name="location" size={20} color="red"/>
                    <Text className="pl-2">{place?.vicinity.length > 14 ? `${place?.vicinity.slice(0,14)}...` : place?.vicinity}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}