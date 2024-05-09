// Home.js
import { View, Text, StyleSheet } from "react-native";
export const ShoppingCart = () => {
    return (
        <View style={styles.container}>
            <Text>This is Home page</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})