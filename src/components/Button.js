import { StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons"; 

export default AddButton = function({text, name, color, f}){
  return (
    <Pressable style={[styles.Button, {backgroundColor: color}]} onPress={f}>
        <Ionicons name={name} color="white" size ={20} padding={10}/>
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
        elevation: 5,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    buttonName: {
        color: 'white',
        fontSize: 16,
        padding: 10,
        fontFamily: 'Poppins_500Medium',
    }
});
