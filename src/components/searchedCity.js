import { SafeAreaView,View,ScrollView,Text,ActivityIndicator,Image } from "react-native";
import Center from "./center";
import { useState,useCallback,useEffect } from "react";
import { getPlaceTypes } from "../hooks/places";
import SearhedPlaceContainer from "./searchedPlacesContainer";
import { getPlaceImage } from "../hooks/places";



export default function SearchedCity({route}){
    const [type,setType] = useState("tourist_attraction");
    const [places,setPlaces] = useState([]);
    const [loading,setLoading] = useState(false);
    const [image,setImage] = useState("");

    const setTypeCB = useCallback((t)=>setType(t),[type]);


    const place = route.params;

    useEffect(()=>{
        const getImage = async ()=>{
            const {width,photo_reference} = place.photos[0];
            const pic = await getPlaceImage(photo_reference,width);
            setImage(pic);
        }
        getImage();
    },[route])

    useEffect(()=>{
        const getNearByPlaces = async ()=>{
            setLoading(true);
            try{
                const data = await getPlaceTypes(place.geometry.location.lng,place.geometry.location.lng,type);
                console.log(data);
                setPlaces(data.results);
            }catch(err){
                return;
            }finally{
                setLoading(false);
                return;
            }
        }

        getNearByPlaces()
    },[type,route])

    return(
        <SafeAreaView className="flex-1">
            <View>
            <View className="w-full bg-white h-60">
                <Image source={{uri:image}} className="h-full w-full object-cover"/>
            </View>
            <View className="px-3">
                <Text className="font-bold text-base">
                  {(type).replace("_"," ")}s in {place.formatted_address}
                </Text>
            </View>
            <ScrollView className="my-5 px-2" horizontal showsHorizontalScrollIndicator={false}>
                    <Center type={"tourist attraction"} icon="airplane-outline" callback={()=>setTypeCB("tourist_attraction")}/>
                    <Center type="resturant" icon="fast-food-outline" callback={()=>setTypeCB("resturant")}/>
                    <Center type="hospital" icon="medical-outline" callback={()=>setTypeCB("hospital")}/>
                    <Center type="hotel" icon="home-outline" callback={()=>setTypeCB("lodging")}/>
                    <Center type="gym" icon="barbell" callback={()=>setTypeCB("gym")}/>
                    <Center type="police" icon="flag" callback={()=>setTypeCB("police")}/>
                    <Center type="store" icon="cart" callback={()=>setTypeCB("shopping_mall")}/>
            </ScrollView>
            </View>
            <View className="mt-2">
                {
                    loading?
                    <ActivityIndicator size={"large"}/>:
                    <SearhedPlaceContainer places={places}/>
                }
            </View>
        </SafeAreaView>
    )
}