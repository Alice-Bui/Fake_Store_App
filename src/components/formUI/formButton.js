import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/screenColors";
export const FormButton = ({ children, onPress }) => {
    return (
        <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
        >
        <View>
            <Text style={styles.buttonText}>{children}</Text>
        </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: colors.green,
        elevation: 5,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
