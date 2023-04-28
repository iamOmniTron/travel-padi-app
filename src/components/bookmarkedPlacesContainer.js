import { useEffect, useState } from "react";
import BookmarkedPlace from "./bookmarkedPlace";
import { MOCK_PLACES } from "./recommendedPlacesContainer";
import { ScrollView } from "react-native";
import { useFetchBookmarked } from "../hooks/user";



export default function BookmarkedPlacesContainer(){
    
    const bookmarks = useFetchBookmarked();
    return(
        <ScrollView className="px-2 mt-4 flex mb-10" showsVerticalScrollIndicator={false}>
            {
                bookmarks.map((place,idx)=><BookmarkedPlace place={place} key={idx}/>)
            }
        </ScrollView>
    )

}