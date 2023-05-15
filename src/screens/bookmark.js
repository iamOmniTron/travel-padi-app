import { Ionicons } from "@expo/vector-icons";
import { FlatList, SafeAreaView, Text,TouchableOpacity, View } from "react-native";
import BookmarkedPlacesContainer from "../components/bookmarkedPlacesContainer";

export default function Bookmark({navigation}){
    console.log(navigation)
    return(
        <SafeAreaView className="flex-1 bg-gray-300">
            <View className="flex flex-row mt-2 px-2">
                <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
                    <Ionicons name="chevron-back" size={30} color={"white"} />
                </TouchableOpacity>
                <Text className="ml-4 text-gray-500 font-bold text-xl text-center">
                    Your Bookmarked Places
                </Text>
            </View>
            <BookmarkedPlacesContainer route={navigation}/>
        </SafeAreaView>
    )
}