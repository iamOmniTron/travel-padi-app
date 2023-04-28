import { Ionicons } from "@expo/vector-icons"
import {View,Text,Image} from "react-native"


export default function BookmarkedPlace({place}){


    return(
        <View className="bg-white rounded-md flex-1 h-56 mb-3">
            <Image source={{uri:place.imageURL}} className="w-full h-3/5 rounded-md"/>
            <View className="ml-3 mt-2">
                <View className="flex flex-row pr-2">
                    <Ionicons name="md-location" color="red" size={20}/>
                    <Text className="text-gray-500 font-bold text-base">{place.address}</Text>
                </View>
                <View>
                    <Text className="text-gray-500 text-md">Bookmarked on : {(new Date(place.createdAt).toLocaleDateString())}</Text>
                </View>
            </View>
        </View>
    )
}