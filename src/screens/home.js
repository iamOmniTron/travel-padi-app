import {Text,View,TouchableOpacity, TextInput} from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"



export default function Home({navigation}){

    return (
        <SafeAreaView className="flex-1 bg-blue-200 px- pt-4">
            <View className="flex flex-row">
                <View className="mx-3 flex-none w">
                <FontAwesome5 name="user-circle" size={30} color="#3f3f3f" />
                </View>
                <View className="flex flex-row items-center bg-white px-2 rounded-sm w-70">
                <FontAwesome5 name="search" size={15} color="#3f3f3f" />
                <TextInput placeholder="search a location" className="px-2"/>
                </View>
            </View>
            <View>
                
            </View>
        </SafeAreaView>
    )
}