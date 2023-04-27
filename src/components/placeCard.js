import { View,Image } from "react-native";



export default function PlaceCard({image}){


    return(
        <View className="h-40 w-32 bg-gray-300 rounded-md mx-3" style={{elevation:10}}>
            {/* Image here */}
            <Image source={image} className="w-full h-full object-cover rounded-md"/>
        </View>
    )
}