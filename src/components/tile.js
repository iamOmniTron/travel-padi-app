import { Text,View,TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function Tile({place}){
    const navigation = useNavigation();
    return(
        <TouchableOpacity className="bg-white rounded-md h-20  my-2 px-4 flex-row items-center justify-between" onPress={()=>navigation.navigate("/place")}>
            <Text className="font-semibold pt-4">
            {place}
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("/place")}>
             <Ionicons name="chevron-forward" size={40} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}