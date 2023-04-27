import { Text,View,TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function PlaceItem({place}){
    const navigation = useNavigation();
    return(
        <TouchableOpacity className="bg-white rounded-md h-20  my-2 px-4 flex-row justify-between" onPress={()=>navigation.navigate("Bookmarked",{bookmarked:place})}>
            <View className="flex flex-row items-center">
                <View>
                    <Ionicons name="location-sharp" size={30} color="red" />
                </View>
                <View className="ml-4">
                <Text className="font-semibold text-lg text-gray-500">
                    {place.city??place.state}
                    </Text>
                    <Text className="text-black text-sm whitespace-normal">
                        {place.address}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}