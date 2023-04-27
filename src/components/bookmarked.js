import { SafeAreaView,TouchableOpacity,Text, View,Modal, TextInput,Image, FlatList} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import {useEffect, useState} from "react";
import { useAddLocation, useBookmark, useRating } from "../hooks/user";
import { ToastError, ToastSuccess } from "../utils/toast";
import {AirbnbRating} from "react-native-ratings";
import { getPlaceDetails, getPlaceImage } from "../hooks/places";
import axios from "axios";
import { SERVER_URL } from "../defaults/utils";
import { ScrollView } from "react-native-gesture-handler";



const Review = ({review})=>{

    return(
        <View>
            <Text>Ratings: {review.ratings}</Text>
            <Text>Review: {review.review}</Text>
        </View>
    )
}




export default function Bookmarked({navigation,route}){
    const {bookmarked} = route.params;

    console.log(bookmarked)


    return(
        <SafeAreaView className="flex-1 bg-blue-300 px-4 pt-4 mb-10">
        <View>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back" size={25} color="white" />
            </TouchableOpacity>
        </View>
        {/* Image container */}
        <View className="mt-4 h-40 w-full rounded-md bg-white" style={{elevation:10}}>
            <Image style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
            }} source={{uri:`data:image/png;base64,${bookmarked.state}`}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-4">
            <Text className="text-lg font-bold text-white">Information:</Text>
            <View className="ml-3 mt-2">
                <View className="mb-5 flex flex-row pr-4">
                    <Text className="font-bold text-18">Address:</Text><Text className="mx-3 font-bold">{bookmarked.address}</Text>
                </View>
                <View className="mb-5 flex flex-row ">
                    <Text className="font-bold text-18">Place Category:</Text>
                    <Text className="mx-3 font-bold ">{bookmarked.category}</Text>
                </View>
                <View className="mb-5 flex flex-row ">
                    <Text className="font-bold text-18">City:</Text>
                    <Text className="mx-3 font-bold">{bookmarked.city}</Text>
                </View>
            </View>
        </View>
        <Text className="mt-3 text-lg font-bold text-white">Your Reviews</Text>
        <View>
            <FlatList
                data={bookmarked.Reviews}
                keyExtractor={({id})=>id}
                renderItem={({item})=><Review review={item}/>}
                />
                
        </View>
        </ScrollView>
        {/* <TouchableOpacity className="mt-8 rounded-md bg-blue-500 px-4 py-4" onPress={()=>setIsOpened(true)}>
            <Text className="text-white font-bold text-24 text-center">Make a review</Text>
        </TouchableOpacity> */}
        {/* <Modal visible={isOpened} transparent animationType="slide" onRequestClose={()=>setIsOpened(false)}>
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
        </Modal> */}
    </SafeAreaView>
    )
}