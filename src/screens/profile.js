import {Text,Image,View,SafeAreaView,TouchableOpacity,TextInput, ScrollView} from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { AVATAR } from "../defaults/images";
import userStore from "../store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_NAME } from "../defaults/utils";
import { ToastSuccess } from "../utils/toast";



export default function Profile({navigation}){

    const logout = userStore(state=>state.logout);
    const user = userStore(state=>state.user);

    const handleLogout = async()=>{
        try{
            await AsyncStorage.clear();
            logout();
            ToastSuccess("Logout successful")
            return navigation.navigate("Login");
        }catch(err){
            ToastError("server error")
        }
    }
    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row mt-2 px-2">
                <TouchableOpacity onPress={navigation.goBack}>
                    <Ionicons name="chevron-back" size={30} color={"gray"} />
                </TouchableOpacity>
            </View>
            <View className="flex items-center w-full mt-10">
                <View className="h-28 w-28 rounded-full" style={{elevation:10}}>
                    <Image source={AVATAR} className="object-fit rounded-full h-full w-full"/>
                </View>
                <View className="flex flex-row justify-between items-center mt-5">
                    <Ionicons name="person" size={24} color="gray"/>
                     <Text className="text-base text-gray-500 font-bold ml-4">{user.name??"Abdulmumeen"}</Text>
                </View>
                <View className="flex flex-row justify-between items-center mt-5">
                    <Ionicons name="mail-outline" size={24} color="gray"/>
                     <Text className="text-base text-gray-500 font-bold ml-4">{user.email ?? "abdul@gmail.com"}</Text>
                </View>
                <View className="flex flex-row justify-between items-center mt-5">
                    <Ionicons name="call-outline" size={24} color="gray"/>
                     <Text className="text-base text-gray-500 font-bold ml-4">{user.phone ?? "07081320894"}</Text>
                </View>
            </View>
            <View className="flex justify-center items-center h-2/5">
                <TouchableOpacity className="flex flex-row w-36 items-center justify-center rounded-md px-3 py-2 bg-gray-500" onPress={handleLogout}>
                    <Text className="font-bold text-base text-white mr-2">Logout</Text>
                    <Ionicons name="log-out-outline" size={20} color="white"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}