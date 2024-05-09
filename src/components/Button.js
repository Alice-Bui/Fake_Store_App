import { StyleSheet, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
export default AddButton = function({text, name, f}){
  return (
    <Pressable style={styles.Button} onPress={f}>
        <MaterialCommunityIcons name={name} color="white" size ={25} padding={10}/>
        <Text style = {styles.buttonName}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    Button: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        width: 170,
        backgroundColor: "#8497ff"
    },
    buttonName: {
        color: 'white',
        fontSize: 16,
        padding: 10,
        fontFamily: 'Poppins_500Medium',
    }
});
