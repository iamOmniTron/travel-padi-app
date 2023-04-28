import { useNavigation } from "@react-navigation/native"
import {View,Text, ImageBackground, TouchableOpacity} from "react-native"




export default function RecommendedPlace({place}){
        const navigation = useNavigation();
    return(
        <View className="w-full h- flex-1 my-2 rounded-md px-2">
            <ImageBackground source={place.image} className="flex-1 rounded-md h-full w-full object-cover">
                <TouchableOpacity activeOpacity={.5} className="h-full">
                    <View className="flex flex-row">
                        <Text className="text-white text-lg font-bold mt-10 ml-4">{place.name}</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}