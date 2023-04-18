import { View,Text,TextInput } from "react-native";



export default function Input({label,placeholder,customStyles,callback}){
    <View className>
        <Text className="text-10 text-gray-100">{label}</Text>
        <TextInput placeholder={placeholder} className={`${{...customStyles}} h-1/2 w-full`} onChangeText={callback}/>
    </View>
}