import { View } from "react-native";
import Tile from "./tile";

export default function PlacesContainer({data}){

    return(
        <>
        <View className="flex flex-col h-full">
            {
                data.map((location,idx)=>(
                    <Tile key={idx} place={location}/>
                ))
            }
        </View>
        </>
    )
}