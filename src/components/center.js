import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function Center({icon,callback}){


    return (
        <TouchableOpacity onPress={callback} activeOpacity={.5}>
            <View className="bg-gray-300 rounded-md flex justify-center items-center p-5">
                <Ionicons name={icon} size={24} color={"white"}/>
            </View>
        </TouchableOpacity>
    )
}