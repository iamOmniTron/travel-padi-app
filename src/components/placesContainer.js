import { View,FlatList } from "react-native";
import uuid from "react-native-uuid"
import Tile from "./tile";

export default function PlacesContainer({data}){

    return(
        <>
        <View className="flex flex-col h-full pb-10">
            <FlatList
                data={data}
                renderItem={({item})=><Tile place={item}/>}
                keyExtractor={()=>uuid.v4()}
                showsVerticalScrollIndicator={false}/>
        </View>
        </>
    )
}