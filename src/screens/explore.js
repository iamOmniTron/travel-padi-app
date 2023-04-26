import {View,Text,Image, SafeAreaView, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlacesContainer from "../components/placesContainer";
import { GOOGLE_API_KEY } from "../defaults/utils";
import { THINKING_FACE } from "../defaults/images";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const NoResult = ()=>{


    return(
        <View className="w-full h-60">
            <Image source={THINKING_FACE} className="w-full h-full object-contain"/>
        </View>
    )
}



export default function Explore({navigation}){
    return(
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4 mb-10">
            <View className="flex flex-row justify-between items-center">
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="white" />
                </TouchableOpacity>
                
            <GooglePlacesAutocomplete
                    placeholder='Type to search a place'
                    onPress={(data) => {
                        return navigation.navigate("Place",{place:data});
                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                        components: 'country:ng',
                    }}
                    className="w-72"
                    fetchDetails={true}
                    />
            </View>
            <View className="mt-4">
                <Text className="text-white text-lg">Search Results</Text>
            </View>
            <View className="mt-7">
                <NoResult/>
            </View>
        </SafeAreaView>
    )
}