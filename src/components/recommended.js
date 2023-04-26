import { FlatList } from "react-native/types";
import { useFetchRecommended } from "../hooks/user";



export default function RecommendedPlaces(){

    const places = useFetchRecommended();

    return(
        <FlatList
            data={places}
            key={(item)=>item.id}
        />
    )
}