import { SafeAreaView,TouchableOpacity,Text, View,Modal,Image, TextInput, ImageBackground} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import { useState,useEffect, useContext } from "react";
import { getDistance, getPlaceDetails, getPlaceImage } from "../hooks/places";
import currentLocationStore from "../store/currentLocationStore";
import { useAddLocation, useBookmark, useRating } from "../hooks/user";
import { ToastError, ToastSuccess } from "../utils/toast";
import RefreshContext from "../context/refreshContext";


export default function Place({route}){
    const [isOpened,setIsOpened] = useState(false);
    const [placeData,setPlaceData] = useState({});
    const [picture,setPicture] = useState("");
    const [currentPlaceRef,setCurrentPlaceRef] = useState("");
    const [loading,setIsLoading] = useState(false);
    const [rating,setRating] = useState(0);
    const [review,setReview] = useState("");

    const {setFlag} = useContext(RefreshContext);

    // const {coords} = currentLocationStore(state=>state.currentLocation);
    // console.log("my location data",coords);
    const rate = useRating();
    const bookmark = useBookmark();
    const addLocation = useAddLocation();
    const navigation = useNavigation()
    const place_id = route.params;

    const handleBookmark = async ()=>{
        const response = await bookmark(currentPlaceRef);
        if(!response){
            ToastError("Cannot bookmark this place");
            return;
        }
        ToastSuccess("Location bookmarkes successfully");
        setFlag(f=>!f);
        return;
    }

    const handleRating = async ()=>{
        const response = await rate(currentPlaceRef,rating,review);
        if(!response){
            ToastError("Cannot send review now");
            return;
        }
        ToastSuccess("review added successfully");
        setFlag(f=>!f);
        setIsOpened(false);
        return;
    }


    useEffect(()=>{
        const init = async()=>{
            setIsLoading(false);
            const data = await getPlaceDetails(place_id);
            // const {geometry:{location}} = data;
            setPlaceData(data);
            const {width,photo_reference} = data.photos[0];
            const placeImage = await getPlaceImage(photo_reference,width);
            setPicture(placeImage)
            // const distanceResponse = await getDistance(coords.longitude,coords.latitude,location.lng,location.lat);
            const payload = {
                address:data.formatted_address,
                category:data.types[0],
                imageURL:placeImage,
                placeId:place_id
            }
            const addLocationResponse = await addLocation(payload);
            setCurrentPlaceRef(addLocationResponse);
            setFlag(f=>!f);
            setIsLoading(true);
        }
        init();
    },[place_id])


    return(
        <SafeAreaView className="flex-1">
            <ImageBackground style={{flex:0.7,resizeMode:"cover"}} source={{uri:picture}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons name="chevron-back" size={30} color={"white"} />
                    </TouchableOpacity>
                    <View className="flex-row absolute w-full bottom-20">
                        <Text className="font-bold w-full text-white ml-2" style={{fontSize:20,textShadowColor: 'rgba(0, 0, 0, 0.5)',textShadowRadius: 3}}>{placeData.formatted_address}</Text>
                    </View>
                    
            </ImageBackground>
            <View className="bg-white" style={{flex:0.3,top:-30,borderTopLeftRadius:30,borderTopRightRadius:30,paddingHorizontal:20,paddingVertical:40}}>
                <TouchableOpacity activeOpacity={.5} className="h-16 justify-center items-center bg-white w-16 rounded-full top-[-30] absolute" style={{right:20,elevation:10}} onPress={handleBookmark}>
                     <Ionicons name="heart" size={30} color="red"/>
                </TouchableOpacity>

                <View className="mt-3 flex flex-row items-center">
                    <Ionicons name="md-location" size={24} color="red"/>
                    <Text className="text-gray-500 text-lg font-bold ml-2">50km from your current location</Text>
                </View>
                <Text className="text- text-gray-500 pt-2">{placeData.formatted_address}</Text>
                <View className="flex justify-end flex-row mt-8">
                    <TouchableOpacity activeOpacity={.5} className="bg-gray-500 rounded-md p-3 w-24" onPress={()=>setIsOpened(true)}>
                        <Text className="font-bold text-md text-center text-white">Review</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={isOpened} transparent animationType="slide" onRequestClose={()=>setIsOpened(false)}>
                <View className="h-54 mt-auto bg-gray-200">
                    <View className="flex items-end mr-1 mt-2">
                        <TouchableOpacity className=" rounded-md w-8" onPress={()=>setIsOpened(false)}>
                            <Text className="text-lg font-bold text-gray-400 text-center">X</Text>
                        </TouchableOpacity>
                    </View>
                        <AirbnbRating defaultRating={0} onFinishRating={(e)=>setRating(e)}/>
                        <View className="px-4 pb-2 mt-2">
                            <TextInput
                                    className="bg-white p-4 rounded-md"
                                    multiline
                                    numberOfLines={2}
                                    maxLength={40}
                                    onChangeText={text => setReview(text)}
                                    value={review}
                                    style={{padding: 10}} placeholder="enter review"/>
                        </View>
                        <View className="flex items-center">
                        <TouchableOpacity className="bg-blue-500 rounded-md w-20 my-3" onPress={handleRating}>
                            <Text className="font-bold text-lg py-2 text-white text-center">
                                Submit
                            </Text>
                        </TouchableOpacity>
                        </View>
                </View>
                </Modal>
        </SafeAreaView>
    )
}


