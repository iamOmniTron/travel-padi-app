import { SafeAreaView,TouchableOpacity,Text, View,Modal, TextInput,Image, ImageBackground} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



export default function Place({route}){
    const navigation = useNavigation()
    const {place} = route.params;
    return(
        <SafeAreaView className="flex-1">
            <ImageBackground style={{flex:0.7}} source={place.image}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons name="chevron-back" size={30} color={"white"} />
                    </TouchableOpacity>
                    <View className="flex-row absolute w-full bottom-20">
                        <Text className="font-bold w-full text-white ml-2" style={{fontSize:25,textShadowColor: 'rgba(0, 0, 0, 0.5)',textShadowRadius: 3}}>{place.name}</Text>
                    </View>
                    
            </ImageBackground>
            <View className="bg-white" style={{flex:0.3,top:-30,borderTopLeftRadius:30,borderTopRightRadius:30,paddingHorizontal:20,paddingVertical:40}}>
                <TouchableOpacity activeOpacity={.5} className="h-16 justify-center items-center bg-white w-16 rounded-full top-[-30] absolute" style={{right:20,elevation:10}}>
                     <Ionicons name="heart" size={30} color="red"/>
                </TouchableOpacity>

                <View className="mt-3 flex flex-row items-center">
                    <Ionicons name="md-location" size={24} color="red"/>
                    <Text className="text-gray-500 text-lg font-bold ml-2">50km from your current location</Text>
                </View>
                <Text className="text-base text-gray-500 pt-2">{place.name}</Text>
                <View className="flex justify-end flex-row mt-8">
                    <TouchableOpacity activeOpacity={.5} className="bg-gray-500 rounded-md p-3 w-24">
                        <Text className="font-bold text-md text-center text-white">Review</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


// <Modal visible={isOpened} transparent animationType="slide" onRequestClose={()=>setIsOpened(false)}>
// <View className="h-54 mt-auto bg-gray-200">
//     <View className="flex items-end mr-1 mt-2">
//         <TouchableOpacity className=" rounded-md w-8" onPress={()=>setIsOpened(false)}>
//             <Text className="text-lg font-bold text-gray-400 text-center">X</Text>
//         </TouchableOpacity>
//     </View>
//         <AirbnbRating onFinishRating={(e)=>setRating(e)}/>
//         <View className="px-4 pb-2 mt-2">
//             <TextInput
//                     className="bg-white p-4 rounded-md"
//                     multiline
//                     numberOfLines={2}
//                     maxLength={40}
//                     onChangeText={text => setReview(text)}
//                     value={review}
//                     style={{padding: 10}} placeholder="enter review"/>
//         </View>
//         <View className="flex items-center">
//         <TouchableOpacity className="bg-blue-500 rounded-md w-20 my-3" onPress={handleRating}>
//             <Text className="font-bold text-lg py-2 text-white text-center">
//                 Submit
//             </Text>
//         </TouchableOpacity>
//         </View>
// </View>
// </Modal>