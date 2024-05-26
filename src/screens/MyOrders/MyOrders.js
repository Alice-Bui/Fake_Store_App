// Home.js
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCartProducts, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../constants/colors";

export const MyOrders = () => {
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
                                            <Ionicons name="remove-circle" color={colors.highlight} size ={25} padding={10}/>
                                        </Pressable>
                                        <Text style={styles.quantity}>quantity: {item.quantity}</Text>
                                        <Pressable onPress={() => handleIncreaseQuantity(item)}>
                                            <Ionicons name="add-circle" color={colors.highlight} size ={25} padding={10}/>
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