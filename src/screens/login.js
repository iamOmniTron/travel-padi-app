import { Text,View,SafeAreaView,Image,Platform, TouchableOpacity,KeyboardAvoidingView,Pressable, ScrollView, TextInput } from "react-native";
import { useState, } from "react";
import { HEADER_IMG } from "../defaults/images";
import { useLogin } from "../hooks/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_NAME } from "../defaults/utils";
import userStore,{ getUserApi } from "../store/userStore";


export default function Login({navigation}){
    const [loading,setLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const login = useLogin();
    const setUser = userStore(state=>state.setUser);

    const handleSubmit = async ()=>{
        setLoading(true)
        const payload = {
            email,
            password
        }
        const {data} = await login(payload);
        await AsyncStorage.setItem(AUTH_TOKEN_NAME,data);
        // Call to user profile api
        const profile = await getUserApi(data);
        console.log(profile)
        setUser(profile);
        setLoading(false);
        setTimeout(() => {
            return navigation.navigate("Home");
        }, 2000);
    }

    // useEffect(()=>{
    //     const getPlaces = async ()=>{
    //         const country = "Nigeria"
    //         const {data} = await axios.get(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`);

    //         console.log(data)
    //     }
    //     getPlaces();
    // },[])


    return (
        <SafeAreaView className="flex-1 minh-screen w-screen  bg-white">
                <KeyboardAvoidingView behavior={Platform.OS === "ios"?"padding":"height"}>
                    <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mt-10 items-center justify-center h-full  px-2">
                <View className="h-20 w-20 rounded-full shadow-sm bg-blue-300">
                    <Image source={HEADER_IMG} className="w-full h-full object-contain"/>
                </View>
                <Text className="text-lg mt-2 font-bold">LOGIN</Text>
                        <View className="px-2 w-full mt-3 shadow-sm h-50">
                            {/* Email input */}
                            <View className="w-full px-4 flex my-3 items-center gap-2">
                                <TextInput placeholder="enter email" className="border rounded-sm w-80 p-2" value={email} onChangeText={(e)=>setEmail(e)}/>
                            </View>
                            <View className="w-full px-4 my-3 flex items-center gap-2">
                                <TextInput secureTextEntry placeholder="enter password" className="border rounded-sm w-80 p-2" value={password} onChangeText={(e)=>setPassword(e)}/>
                            </View>
                            <View className=" w-full items-center">
                                <TouchableOpacity className="bg-blue-500 items-center justify-center h-10 rounded-sm w-80" onPress={handleSubmit}>
                                        <Text className="text-lg font-bold text-white">Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="w-full mt-10">
                            <TouchableOpacity onPress={()=>navigation.navigate("Signup")} className="w-full px-5">
                            <Text className="text-sm text-blue-500 mb-40">
                                new? Create an account
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
        </SafeAreaView>
                
    )
}
