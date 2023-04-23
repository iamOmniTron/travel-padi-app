import { View } from "react-native";
import Tile from "./tile";

export default function PlacesContainer({data}){

    return(
        <>
        <View className="flex flex-col h-full pb-10">
            {
                data.map((location,idx)=>(
                    <Tile key={idx} place={location}/>
                ))
            }
        </View>
        </>
    )
}