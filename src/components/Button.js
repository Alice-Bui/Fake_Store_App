import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
export default AddButton = function({text, name, f, color}){
  return (
    <Pressable style={[styles.Button, {backgroundColor: color}]} onPress={f}>
        <MaterialCommunityIcons name={name} color="white" size ={30} padding={10}/>
        <Text style = {styles.buttonName}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    Button: {
        backgroundColor: '#8497FF',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    buttonName: {
        color: 'white',
        fontSize: 24,
        padding: 10,
        fontFamily: 'Poppins_400Regular',
    }
});
