import { FlatList} from "react-native";
import PlaceCard from "./placeCard";
import { OBUDU,HOTEL_1,ROCK,FOOD } from "../defaults/images";



export default function HomePlacesContainer({places}){

    return(
        <FlatList
            className="py-3"
            horizontal
            data={places}
            renderItem={({item})=><PlaceCard place={item}/>}
            keyExtractor={({id})=>id}
            showsHorizontalScrollIndicator={false}
        />
    )
}