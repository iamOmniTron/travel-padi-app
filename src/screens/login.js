import { Text,View,SafeAreaView,Image,Platform, TouchableOpacity,KeyboardAvoidingView,Pressable, ScrollView, TextInput } from "react-native";
// import { COLORS } from "../defaults/utils"
import { useState } from "react";
import { HEADER_IMG } from "../defaults/images";
import Input from "../components/Input";


export default function Login({navigation}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    return (
        <SafeAreaView className="flex-1 h-screen w-screen  bg-white">
            <View className="mt-20 items-center justify-center h-full  px-2">
                <View className="h-20 w-20 rounded-full shadow-sm bg-blue-300">
                    <Image source={HEADER_IMG} className="w-full h-full object-contain"/>
                </View>
                <Text className="text-lg  mt-2 font-bold">LOGIN</Text>
                <KeyboardAvoidingView behavior={Platform.OS === "ios"?"padding":"height"}>
                    <ScrollView showsVerticalScrollIndicator={false} className="h-full">
                        <View className="px-2 w-full mt-3 shadow-sm h-50">
                            {/* Email input */}
                            <View className="w-full px-4 flex my-3 items-center gap-2">
                                <TextInput placeholder="enter email" className="border rounded-sm w-80 p-2"/>
                            </View>
                            <View className="w-full px-4 my-3 flex items-center gap-2">
                                <TextInput placeholder="enter password" className="border rounded-sm w-80 p-2"/>
                            </View>
                            <View className="px-2 my w-full items-center">
                                <TouchableOpacity className="bg-blue-500 items-center justify-center h-10 rounded-sm w-80" onPress={()=>navigation.navigate("Home")}>
                                        <Text className="text-lg font-bold text-white">Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="w-full mt-4">
                            <TouchableOpacity onPress={()=>navigation.navigate("Signup")} className="w-full px-5">
                            <Text className="text-sm text-blue-500 ps-4">
                                new? Create an account
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
                
    )
}
