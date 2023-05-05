import {SafeAreaView, Text,View,Image,Modal,TextInput,TouchableOpacity,ScrollView} from "react-native"
import {useState,useEffect} from "react";
import { getPlaceImage } from "../hooks/places";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { useAddLocation, useBookmark, useRating } from "../hooks/user";
import { ToastError,ToastSuccess } from "../utils/toast";



export default function SearchedPlace({route}){
    const [image,setImage] = useState("");
    const [rating,setRating] = useState(0);
    const [review,setReview] = useState("");
    const [isOpened,setIsOpened] = useState(false);
    const [currentPlaceRef,setCurrentPlaceRef] = useState("");

    const place = route.params;
    console.log(place)

    const bookmark = useBookmark();
    const rate = useRating();
    const addLocation = useAddLocation();
    

    const handleBookmark = async ()=>{
        const response = await bookmark(currentPlaceRef);
        if(!response){
            ToastError("Cannot bookmark this place");
            return;
        }
        ToastSuccess("Location bookmarkes successfully");
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

    // useEffect(()=>{
    //     const savePlace = async ()=>{
    //          const payload = {
    //             address:place.vicinity,
    //             name:place.name,
    //             category:place.types.find((t)=>!t.includes("_")).toString(),
    //             imageURL:"",
    //             placeId:place.place_id
    //          }
    //          const response = await 
    //     }
    // })

    useEffect(()=>{
        const getImage = async()=>{
            const {width,photo_reference} = place.photos[0];
            const pic = await getPlaceImage(photo_reference,width);
            setImage(pic);
            const payload = {
                address:place.vicinity,
                name:place.name,
                category:place.types.find((t)=>!t.includes("_")).toString(),
                imageURL:pic,
                placeId:place.place_id
             }
            const response = await addLocation(payload);
            setCurrentPlaceRef(response);
            return;
        }
        getImage();
    },[route])


    return(
        <SafeAreaView className="bg-gray-300 h-full">
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className="h-60 w-full bg-white">
                {
                    image && <Image source={{uri:image}} className="w-full h-full object-cover"/>
                }
            </View>
            <View className="mt-3 px-3 flex">
                <View className="flex flex-row items-center space-x-2">
                <Text className="font-extrabold text-base">{place.name}</Text>
                <Text className={`${place.opening_hours.open_now?"text-green-500":"text-red-500"}`}>{place.opening_hours && place.opening_hours.open_now? "Currently Open":"Currently Closed"}</Text>
                </View>
                <View className="mt-2 flex flex-row items-center">
                    <Text className="font-bold mr-3">{place.rating}</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={place.rating??0}
                        size={20}
                        ratingContainerStyle={{height:2,marginRight:10,marginTop:-20}}
                    />
                    <Text>
                        ({place.user_ratings_total})
                    </Text>
                </View>
                <Text className="font-bold capitalize">{place.types.find((t)=>!t.includes("_"))}</Text>
                <View className="w-full my-2 flex items-center">
                    <View className=" w-11/12 rounded-md h-16 shadow-md bg-white flex flex-row justify-around items-center">
                        <TouchableOpacity activeOpacity={.7} className="flex items-center" onPress={handleBookmark}>
                            <Ionicons name="heart" size={30} color={"gray"}/>
                            <Text>Bookmark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7} className="flex items-center">
                            <Ionicons name="map" size={30} color={"gray"}/>
                            <Text>Directions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setIsOpened(true)} className="flex items-center">
                            <Ionicons name="chatbox-ellipses" size={30} color={"gray"}/>
                            <Text>Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex flex-row">
                    <Ionicons name="location" color="red" size={24}/>
                    <Text className="text-sm">{place.vicinity}</Text>
                </View>
                <View className="flex flex-row">
                    <Ionicons name="call" size={24} color={"blue"}/>
                    <Text className="text-sm">{place?.formatted_phone_number}</Text>
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
                </ScrollView>
        </SafeAreaView>
    )
}