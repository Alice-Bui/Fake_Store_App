import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const FormInput = ({ label, style, config, invalid }) => {
    let inputStyles = [styles.input];
    if (config && config.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
    return (
        <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>
            {label}
        </Text>
        <TextInput
            style={[inputStyles, invalid && styles.invalidBackground]}
            {...config}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,

    },
    label: { 
        fontSize: 14, 
        color: colors.green, 
        marginBottom: 4,
        fontFamily: 'Poppins_500Medium'
    },
    input: {
        backgroundColor: colors.lightgreen,
        color: colors.text,
        padding: 6,
        borderRadius: 6,
        fontSize: 14,
        fontFamily: "Poppins_400Regular"
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    invalidLabel: {
        color: colors.red,
    },
    invalidBackground: {
        borderColor: colors.red,
        borderWidth: 2
    },
});
