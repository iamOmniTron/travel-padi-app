import { ScrollView } from "react-native";
import PlaceCard from "./placeCard";
import { OBUDU,HOTEL_1,ROCK,FOOD } from "../defaults/images";



export default function HomePlacesContainer(){

    // Make API request and get all place


    return(
        <ScrollView horizontal={true} className="mt-3" showsHorizontalScrollIndicator={false}>
            <PlaceCard image={OBUDU}/>
            <PlaceCard image={HOTEL_1}/>
            <PlaceCard image={ROCK}/>
            <PlaceCard image={FOOD}/>
        </ScrollView>
    )
}