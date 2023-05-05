import { FlatList } from "react-native";
import SearchedPlaceCard from "./searchedPlaceCard";



export default function SearhedPlaceContainer({places}){

    return(
        <FlatList
            className="py-3 px-2 w-full"
            data={places}
            renderItem={({item})=><SearchedPlaceCard place={item}/>}
            keyExtractor={({id})=>id}
            showsVerticalScrollIndicator={false}
        />
    )

}