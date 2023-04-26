import { FlatList, SafeAreaView, Text,TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from  "axios";
import { AUTH_TOKEN_NAME,SERVER_URL } from "../defaults/utils";
import { ToastError } from "../utils/toast";
import PlaceItem from "../components/placeItem";


export default function Bookmark({navigation}){
    const [loading,setLoading] = useState(false)
    const [bookmarks,setBookmarks] = useState([]);

    useEffect(()=>{
        const getBookmarks = async ()=>{
            try{
                setLoading(true)
                const token = await AsyncStorage.getItem(AUTH_TOKEN_NAME);
                const {data:response} = await axios.get(`${SERVER_URL}/bookmarks`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                console.log(response);
                if(!response){
                    ToastError("network error");
                    return;
                }
                if(!response.success){
                    ToastError(data.message);
                    return;
                }
                console.log(response.data);
                setBookmarks(response.data);
                setLoading(false);
            }catch(err){
                ToastError(err.message??"Something went wrong")
                console.log("error",err)
            }
        }
        getBookmarks();
    })

    return(
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4">
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="white" />
                </TouchableOpacity>
            </View>
            <View className="mt-3">
                <Text className="text-white text-lg font-bold">Bookmarked Places</Text>
            </View>
            <View>
                <FlatList
                    data={bookmarks}
                    renderItem={({item})=><PlaceItem place={item}/>}
                    keyExtractor={()=>uuid.v4()}
                    showsVerticalScrollIndicator={false}
                    />
            </View>
        </SafeAreaView>
    )
}