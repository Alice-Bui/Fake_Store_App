import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/formColors";
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
        backgroundColor: colors.primary500,
        elevation: 2, // for android. shadow sections are for ios
        shadowColor: colors.primary800,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: "center",
        color: colors.primary50,
        fontSize: 16,
        fontWeight: "bold",
    },
});
