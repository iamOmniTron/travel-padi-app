import BookmarkedPlace from "./bookmarkedPlace";
import { MOCK_PLACES } from "./recommendedPlacesContainer";
import { ScrollView } from "react-native";



export default function BookmarkedPlacesContainer(){

    return(
        <ScrollView className="px-2 mt-4 flex mb-10" showsVerticalScrollIndicator={false}>
            {
                MOCK_PLACES.map((place,idx)=><BookmarkedPlace place={place} key={idx}/>)
            }
        </ScrollView>
    )

}