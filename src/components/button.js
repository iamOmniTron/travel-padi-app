import { View,Text,TouchableOpacity,StyleSheet } from "react-native";
import { COLORS } from "../defaults/utils";


export default function CustomButton({onPress,label,customStyles}){


    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.labelText}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonContainer:{
        height:40,
        backgroundColor:COLORS.BLUE,
        width:100,
        paddingHorizontal:10,
        paddingVertical:5,
        display:"flex",
        alignItems:"center",
        borderRadius:5
    },
    labelText:{
        color:COLORS.WHITE,
        fontSize:20,
        fontWeight:"bold"
    }
})