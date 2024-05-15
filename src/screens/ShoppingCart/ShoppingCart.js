// Home.js
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCartProducts, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import emptyCart from "./file.png"

export const ShoppingCart = () => {
    const cartProducts = useSelector(selectCartProducts);
    const dispatch = useDispatch();
    const handleIncreaseQuantity = (item) => {
        dispatch(increaseQuantity(item))
    };
    const handleDecreaseQuantity = (item) => {
        dispatch(decreaseQuantity(item))
    };
    const totalNum_items = cartProducts.reduce((totnum, itm)=>totnum+itm.quantity, 0);
    const totalPrice_items = cartProducts.reduce((totprice, itm)=>totprice+itm.price*itm.quantity, 0)
    const roundTotalPrice_items = Math.ceil(totalPrice_items * 100) / 100;

    return (
        <View style={styles.container}>
            <Title text="Shopping Cart"/>
            {totalNum_items > 0 ? (
            <View>
                <View style={styles.detailsNumber}>
                    <Text style={styles.textKey}>Items: 
                        <Text style={styles.textValue}> {totalNum_items}</Text>
                    </Text>
                    <Text style={styles.textKey}>Total Price: 
                        <Text style={styles.textValue}> ${roundTotalPrice_items}</Text>
                    </Text>
                </View>

                <View style={styles.productContainer}>
                    <FlatList
                        data={cartProducts}
                        renderItem={({ item }) => (
                            <View style={styles.product}>
                                <Image source={{uri: item.image}} style={styles.productImage}/>
                                <View style={styles.productText}>
                                    <View>
                                        <Text style={styles.productName}>{item.title}</Text>
                                        <Text style={styles.productPrice}>Price:
                                            <Text style={styles.productName}> ${item.price}</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.quantityContainer}>
                                        <Pressable onPress={() => handleDecreaseQuantity(item)}>
                                            <MaterialCommunityIcons name="minus-circle" color="#8497ff" size ={25} padding={10}/>
                                        </Pressable>
                                        <Text style={styles.quantity}>quantity: {item.quantity}</Text>
                                        <Pressable onPress={() => handleIncreaseQuantity(item)}>
                                            <MaterialCommunityIcons name="plus-circle" color="#8497ff" size ={25} padding={10}/>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>) 
            : (
                <View style={styles.content}>
                    <Image source={require('./file.png')} style={styles.contentImage}/>
                    <Text style={styles.contentText}>Your cart is empty!</Text>
                    <Text style={styles.contentMessage}>Looks like you haven't added anything to your cart yet</Text>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F3FD',
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
        color: '#8497ff',
        marginBottom: '5%'
    },
    contentMessage: {
        width: '75%',
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        color: '#19274F',
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
        backgroundColor: '#DFEDFF',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '3%',
        marginVertical: '5%',
    },
    textKey: {
        color: '#19274F',
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
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#19274F'
    },
    productText: {
      width: '72%',
      justifyContent: 'space-between',
    },
    productName: {
      fontSize: 13,
      fontFamily: 'Poppins_400Regular',
      color: '#19274F'
    },
    productPrice: {
      fontSize: 13,
      fontFamily: 'Poppins_600SemiBold',
      color: '#19274F'
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
        alignItems: 'center'
    },
    quantity: {
        paddingHorizontal: 15,
        width: '50%',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: '#19274F',
    }
    
})