// Home.js
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCartProducts, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../constants/colors";

export const MyOrders = () => {
    
    return (
        <View style={styles.container}>
            <Title text="Shopping Cart"/>
            
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.backgroundScreen,
        paddingHorizontal: '5%',
        paddingVertical: '8%',
    },

    //When cart is empty
    content: {
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 27,
        color: colors.highlight,
        marginBottom: '5%'
    },
    contentMessage: {
        width: '75%',
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        color: colors.text,
    },
    contentImage: {
        width: '100%',
        height: '35%',
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: '10%',
    },
    
    //When cart has items
    detailsNumber: {
        backgroundColor: colors.lightgreen,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '3%',
        marginVertical: '5%',
    },
    textKey: {
        color: colors.text,
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold'
    },
    textValue: {
        fontFamily: 'Poppins_500Medium',
    },

    //Product List
    productContainer: {
        height: '83%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    product: {
        margin: '2%',
        padding: '2%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    productText: {
      width: '72%',
      justifyContent: 'space-between',
    },
    productName: {
      fontSize: 13,
      fontFamily: 'Poppins_400Regular',
      color: colors.text
    },
    productPrice: {
      fontSize: 13,
      fontFamily: 'Poppins_600SemiBold',
      color: colors.text
    },
    productImage: {
      width: '23%',
      height: 85,
      resizeMode: 'contain',
      borderRadius: 10,
      marginRight: '5%',
    },

    ///Quantity Control
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        paddingHorizontal: 15,
        width: '50%',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: colors.text,
    }
    
})