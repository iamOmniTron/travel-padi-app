import {Text,View,SafeAreaView,TouchableOpacity,TextInput, ScrollView} from "react-native"
import { FontAwesome5,Ionicons } from "@expo/vector-icons";
import userStore from "../store/userStore";




export default function Profile({navigation}){
    const currentUser = userStore(state=>state.user);
    const isLoggedIn = userStore(state=>state.isLoggedIn);

    const logout = userStore(state=>state.logout);
    console.log(isLoggedIn)

    const goToLogin = ()=>navigation.navigate("Login")

    const handleLogout = ()=>{
        logout();
        setTimeout(goToLogin,2000);
    }
    
    return (
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4">
            <View className="flex flex-row mb-2" style={{elevation:100}}>
                <View className="mr-2 flex-none">
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="white" />
                </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="w-full flex-1">
                    <View className=" flex justify-center items-center my-4">
                    <FontAwesome5 name="user-circle" size={100} color="gray" />
                    </View>
                    <View className="my-5 mx-3 mt-6 bg-white rounded-md p-4">
                        <View className="flex flex-row border-b-2 items-center my-4">
                            <Text className="text-lg font-bold">name:</Text><Text className="ml-4 text-base">{currentUser.name}</Text>
                        </View>
                        <View className="border-b-2 flex flex-row my-4">
                            <Text className="text-lg font-bold">email:</Text><Text className="ml-4 text-base">{currentUser.email}</Text>
                        </View>
                        <View className="border-b-2 flex flex-row my-4">
                        <Text className="text-lg font-bold">phone:</Text><Text className="ml-4 text-base">{currentUser.phone}</Text>
                        </View>
                    </View>
                    <View className="flex-1 items-center">
                        <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-md" onPress={handleLogout}>
                            <Text className="text-lg text-white">Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}