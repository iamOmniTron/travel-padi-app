import { SafeAreaView,TouchableOpacity,Text, View,Modal, TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import {useEffect, useState} from "react";
import { useAddLocation, useBookmark, useRating } from "../hooks/user";
import { ToastError, ToastSuccess } from "../utils/toast";
import {AirbnbRating} from "react-native-ratings";
import { getPlaceDetails, getPlaceImage } from "../hooks/places";



export default function Place({route}){
    const [placeId,setPlaceId] = useState("");
    const [isOpened,setIsOpened] = useState(false);
    const [rating,setRating] = useState(0);
    const [review,setReview] = useState("");
    const [flag,setFlag] = useState(false);
    const [placeData,setPlaceData] = useState({});
    const [placeImage,setPlaceImage] = useState("");

    const navigation = useNavigation();
    const {place} = route.params;

    const addLocation = useAddLocation();
    const bookmarkPlace = useBookmark();
    const ratePlace = useRating();

    useEffect(()=>{
        const getPlaceData = async ()=>{
            const response = await getPlaceDetails(place.place_id);
            const {photo_reference,width} = response.photos[0];
            const photo = await getPlaceImage(photo_reference,width);
            console.log("place image",photo);
            setPlaceData({...response});
        }
        getPlaceData();
    },[place])

    // useEffect(()=>{
    //     setFlag(!flag);
    //     const saveLocation = async()=>{
    //         const payload = {
    //             longitude:place.lon,
    //             latitude:place.lat,
    //             address:place.formatted,
    //             category:place.category,
    //             state:place.state,
    //             city:place.city
    //         };
    //         const response = await addLocation(payload);
    //         console.log(response);
    //         setPlaceId(response);
    //     }
    //     saveLocation();
    //     setFlag(!flag)
    // },[]);

    const handleBookmark = async ()=>{
        const response = await bookmarkPlace(placeId);
        if(!response){
            ToastError("Network error");
            setFlag(!flag)
            return;
        }
        setFlag(!flag);
        return;
    }

    const handleRating = async ()=>{
        const response = await ratePlace(placeId,rating,review);
        console.log(response);
        if(!response){
            setFlag(!flag);
            return ToastError("Network error");
        }
        setIsOpened(false);
        setFlag(!flag);
        return;
    }
    
    return(
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4 mb-10">
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} color="white" />
                </TouchableOpacity>
            </View>
            {/* Image container */}
            <View className="mt-4 h-40 w-full rounded-md bg-white" style={{elevation:10}}>
                    
                {/* <MapView
                    className="h-full w-full"
                    initialRegion={{
                      latitude: place.lat,
                      longitude: place.lon,
                      latitudeDelta: 0.0422,
                      longitudeDelta: 0.0221,
                    }}
                    >
                        <Marker coordinate={{
                            latitude:place.lat,
                            longitude:place.lon
                        }}>
                        <Ionicons name="location-sharp" size={24} color="red" />
                        </Marker>
                    </MapView>
                <TouchableOpacity className="absolute top-28 bg-blue-500 px-3 py-2 rounded-md left-52" onPress={handleBookmark}>
                    <Text className="font-bold text-white">Bookmark</Text>
                </TouchableOpacity> */}
            </View>
            {/* <View className="mt-4">
                <Text className="text-lg font-bold text-white">Information:</Text>
                <View className="ml-3 mt-2">
                <View className="mb-5 flex flex-row ">
                        <Text className="font-bold text-18">Place Category:</Text><Text  className="ml-3 font-bold">{place.category}</Text>
                    </View>
                    <View className="mb-5 flex flex-row pr-4">
                        <Text className="font-bold text-18">Address:</Text><Text className="ml-3 font-bold whitespace-normal">{place.formatted}</Text>
                    </View>
                    <View className="mb-5 flex flex-row pr-4">
                        <Text className="font-bold text-18">City:</Text><Text  className="ml-3 font-bold">{place.county}</Text>
                    </View>
                    <View className="flex flex-row pr-4">
                        <Text className="font-bold text-18">State:</Text><Text className="ml-3 font-bold whitespace-normal">{place.state}</Text>
                    </View>
                </View>
            </View> */}
            <TouchableOpacity className="mt-8 rounded-md bg-blue-500 px-4 py-4" onPress={()=>setIsOpened(true)}>
                <Text className="text-white font-bold text-24 text-center">Make a review</Text>
            </TouchableOpacity>
            <Modal visible={isOpened} transparent animationType="slide" onRequestClose={()=>setIsOpened(false)}>
                <View className="h-54 mt-auto bg-gray-200">
                    <View className="flex items-end mr-1 mt-2">
                        <TouchableOpacity className=" rounded-md w-8" onPress={()=>setIsOpened(false)}>
                            <Text className="text-lg font-bold text-gray-400 text-center">X</Text>
                        </TouchableOpacity>
                    </View>
                        <AirbnbRating onFinishRating={(e)=>setRating(e)}/>
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