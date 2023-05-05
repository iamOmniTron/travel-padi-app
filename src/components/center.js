import { TouchableOpacity, View,Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function Center({icon,callback,type}){


    return (
        <TouchableOpacity onPress={callback} activeOpacity={.5} className="mr-3">
            <View className="bg-gray-300 rounded-md flex justify-center items-center p-5">
                <Ionicons name={icon} size={24} color={"white"}/>
                <Text className="text-sm text-gray-500">{type}</Text>
            </View>
        </TouchableOpacity>
    )
}