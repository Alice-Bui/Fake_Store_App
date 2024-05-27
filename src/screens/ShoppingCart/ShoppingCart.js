// Home.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../constants/colors";
import Button from "../../components/Button";

import { useSelector, useDispatch } from "react-redux";
import { selectCart, selectCartProducts, clearCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";

import { selectUser } from "../../redux/userSlice";
import { updateUserCart } from "../../service/cartService";

import { createNewOrder } from "../../service/orderService";
import { fetchOrders } from "../../components/handleData";


export const ShoppingCart = () => {
    const user = useSelector(selectUser);
    const cartProducts = useSelector(selectCartProducts);
    const cart = useSelector(selectCart)
    const dispatch = useDispatch();

    useEffect(()=>{
        const sendUpdateData = async() => {
            try {
                const result = await updateUserCart(cart, user.token);
                if (result.status === "error") {
                    Alert.alert(result.message);
                }
            } catch (error) {
                console.error("Send update data failed: ", error);
                Alert.alert("Failed to update user's cart")
            }
        };
        sendUpdateData()
    }, [cart])

    const handleIncreaseQuantity = (item) => {
        dispatch(increaseQuantity(item));
    };

    const handleDecreaseQuantity = (item) => {
        dispatch(decreaseQuantity(item))
    };

    const handleCheckOut = async() => {
        try {
            const result = await createNewOrder(cart, user.token);
            console.log("neworder", result)
            if (result.status === "error") {
                Alert.alert(result.message);
            } else {
                dispatch(clearCart())
                fetchOrders(user, dispatch)
            }
        } catch (error) {
            console.error("Create new order failed: ", error);
            Alert.alert("Failed to create user's new order")
        }
    }


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

                <View style={styles.line}/>
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
                                            <Ionicons name="remove-circle" color={colors.green} size ={25} padding={10}/>
                                        </Pressable>
                                        <Text style={styles.quantity}>quantity: {item.quantity}</Text>
                                        <Pressable onPress={() => handleIncreaseQuantity(item)}>
                                            <Ionicons name="add-circle" color={colors.green} size ={25} padding={10}/>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={styles.line}/>

                <View style={styles.checkOutContainer}>
                    <Button text="CHECK OUT" name="wallet" color={colors.red} width={'75%'} f={handleCheckOut}/>
                </View>
            </View>) 
            : (
                <View style={styles.content}>
                    <Ionicons name="sad" color={colors.red} size ={75}/>
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
        justifyContent: 'space-between',
        backgroundColor: colors.beige,
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
        color: colors.red,
        marginBottom: '5%',
        marginTop: '7.5%'
    },
    contentMessage: {
        width: '75%',
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        color: colors.text,
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
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    product: {
        margin: '2%',
        padding: '2%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
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
    },

    //Check out

    line: {
        borderWidth: 1,
        borderColor: colors.green,
        borderStyle: "dashed",
    },
    checkOutContainer: {
        marginVertical: '8.5%',
        alignItems: 'center'
    }
    
})