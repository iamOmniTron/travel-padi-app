import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";
import { LOCATION_STORE_KEY } from "../defaults/utils";



const currentLocationStore = create(
    persist((set)=>({
        currentLocation:{},
        setCurrentLocation:(loc)=>set(()=>({currentLocation:{...loc}})),
        clearLocation:()=>set(()=>({currentLocation:{}}))
    }),
    {
        name:LOCATION_STORE_KEY,
        storage:createJSONStorage(()=>AsyncStorage)
    })
   
)

export default currentLocationStore;