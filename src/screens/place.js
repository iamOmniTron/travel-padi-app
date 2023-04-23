import { SafeAreaView,TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";




export default function Place({place}){
    const navigation = useNavigation();

    return(
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4 mb-10">
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="white" />
                </TouchableOpacity>
            </View>
            {/* Image container */}
            <View className="mt-4 h-40 w-full rounded-md bg-white">
                <TouchableOpacity className="rounded-md bg-blue-500 absolute top-60 left-40">
                    <Text className="text-white font-medium">Bookmark</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}