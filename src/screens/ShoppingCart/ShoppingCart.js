// Home.js
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../redux/cartSlice";

export const ShoppingCart = () => {
    const cartProducts = useSelector(selectCartProducts);
    let totalNum_items = cartProducts.length;
    let totalPrice_items = cartProducts.reduce((tot, itm)=>tot+itm.price, 0)

    console.log(totalNum_items)
    console.log(totalPrice_items)

    return (
        <View style={styles.container}>
            <Title text="Shopping Cart"/>
            <View style={styles.detailsNumber}>
                <Text style={styles.textKey}>Items: 
                    <Text style={styles.textValue}> {totalNum_items}</Text>
                </Text>
                <Text style={styles.textKey}>Total Price: 
                    <Text style={styles.textValue}> {totalPrice_items}</Text>
                </Text>
            </View>

            <View style={styles.productContainer}>
                <FlatList
                    data={cartProducts}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.title}</Text>
                            <Text>{item.price}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <Text>This is the Shopping Cart Screen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F6F3FD',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
    },
    productContainer: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        borderWidth: 1
    },
    detailsNumber: {
        backgroundColor: '#DFEDFF',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '3%',
        marginVertical: '5%',
        width: '100%'
    },
    textKey: {
        color: '#19274F',
        fontFamily: 'Poppins_600SemiBold'
    },
    textValue: {
        fontFamily: 'Poppins_500Medium'
    },
})