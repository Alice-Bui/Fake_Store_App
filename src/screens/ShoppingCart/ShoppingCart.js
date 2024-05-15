// Home.js
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../redux/cartSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 


export const ShoppingCart = () => {
    const cartProducts = useSelector(selectCartProducts);
    let totalNum_items = cartProducts.reduce((totnum, itm)=>totnum+itm.quantity, 0);
    let totalPrice_items = cartProducts.reduce((totprice, itm)=>totprice+itm.price, 0)

    console.log(cartProducts)

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
                        <Text style={styles.textValue}> ${totalPrice_items}</Text>
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
                                        <Pressable>
                                            <MaterialCommunityIcons name="minus-circle" color="#8497ff" size ={25} padding={10}/>
                                        </Pressable>
                                        <Text style={styles.quantity}>quantity: 10</Text>
                                        <Pressable>
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
                    <Text style={styles.contentText}>Your cart is empty!</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 27,
        color: '#19274F',
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
      marginRight: '5%'
    },

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