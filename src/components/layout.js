import { StatusBar } from "expo-status-bar";
import { SafeAreaView, } from "react-native";

export default function Layout({children}){

    return (
        <SafeAreaView className="flex-1 mt-10">
            <StatusBar style="auto"/>
            {children}
        </SafeAreaView>
    )
}