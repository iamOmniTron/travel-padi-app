import { Text,View,TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function Tile({place}){
    const navigation = useNavigation();
    return(
        <TouchableOpacity className="bg-white rounded-md h-40  my-2 px-4 flex-row justify-between" onPress={()=>navigation.navigate("/place")}>
            <View className="flex flex-col">
                <Text className="font-semibold text-lg pt-3 text-gray-500">
                {place.county}
                </Text>
                <Text className="text-black text-sm">
                    {place.formatted}
                </Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("Place",place)}>
             <Ionicons name="chevron-forward" size={40} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}