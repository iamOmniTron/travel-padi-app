import { Text,View,SafeAreaView,Image,Platform, TouchableOpacity,KeyboardAvoidingView,Pressable, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { HEADER_IMG } from "../defaults/images";
import { useSignup } from "../hooks/auth";
import { ToastError } from "../utils/toast";


export default function Signup({navigation}){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("");
    const [cpassword,setCPassword] = useState("");

    const signup = useSignup();

    const handleSubmit = async ()=>{
        if(password !== cpassword){
            ToastError("Passwords dont match");
            return;
        }
        const payload = {
            name:username,email,phone,password
        }
        const response = await signup(payload);
        if(!response.success) return;
        return navigation.navigate("Login");
    }

    return (
        <SafeAreaView className="flex-1 h-screen w-screen  bg-white">
        <KeyboardAvoidingView behavior={Platform.OS === "ios"?"padding":"height"}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className=" items-center justify-center h-full  px-2">
                <View className="h-20 w-20 rounded-full shadow-sm bg-blue-300">
                    <Image source={HEADER_IMG} className="w-full h-full object-contain"/>
                </View>
                <Text className="text-lg  mt-2 font-bold">Create Account</Text>
                        <View className="px-2 w-full mt-3 shadow-sm h-50">
                        <View className="w-full px-4 flex my-3 items-center gap-2">
                                <TextInput placeholder="john doe" className="border rounded-sm w-80 p-2" value={username} onChangeText={(e)=>setUsername(e)}/>
                            </View>
                            <View className="w-full px-4 flex my-3 items-center gap-2">
                                <TextInput placeholder="enter email" className="border rounded-sm w-80 p-2" value={email} onChangeText={(e)=>setEmail(e)}/>
                            </View>
                            <View className="w-full px-4 flex my-3 items-center gap-2">
                                <TextInput placeholder="enter phone" className="border rounded-sm w-80 p-2" value={phone} onChangeText={(e)=>setPhone(e)}/>
                            </View>
                            <View className="w-full px-4 my-3 flex items-center gap-2">
                                <TextInput placeholder="enter password" secureTextEntry className="border rounded-sm w-80 p-2" value={password} onChangeText={(e)=>setPassword(e)}/>
                            </View>
                            <View className="w-full px-4 my-3 flex items-center gap-2">
                                <TextInput placeholder="re-enter password" secureTextEntry className="border rounded-sm w-80 p-2" value={cpassword} onChangeText={(e)=>setCPassword(e)}/>
                            </View>
                            <View className="px-2 my w-full items-center">
                                <TouchableOpacity className="bg-blue-500 items-center justify-center h-10 rounded-sm w-80" onPress={handleSubmit}>
                                        <Text className="text-lg font-bold text-white">Signup</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="w-full mt-4">
                            <TouchableOpacity onPress={()=>navigation.navigate("Login")} className="w-full px-5">
                            <Text className="text-sm text-blue-500 ">
                                have an account? login
                            </Text>
                            </TouchableOpacity>
                        </View>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
                
    )
}
