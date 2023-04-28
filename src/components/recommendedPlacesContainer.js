import { FlatList,Text,View} from "react-native";
import { ABUJA, KANO, LAGOS, PH } from "../defaults/images"
import RecommendedPlace from "./recommendedPlaceCard";
import { useFetchRecommended } from "../hooks/user";

export const MOCK_PLACES = [
    {
        name:"abuja",
        image:ABUJA,
    },
    {
        name:"lagos",
        image:LAGOS
    },
    {
        name:"port harcourt",
        image:PH
    },
    {
        name:"kano",
        image:KANO
    }
]



export default function RecommendedPlacesContainer(){

    const recommendedResults = useFetchRecommended();
    return(
        <View className="mb-10 px-3">
                {
                    recommendedResults.map((place,idx)=><RecommendedPlace place={place} key={idx}/>)
                }
        </View>
    )
}