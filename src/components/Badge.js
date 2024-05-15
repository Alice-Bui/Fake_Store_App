import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCartProducts} from "../redux/cartSlice";

export default cartBadge = function(){
    const cartProducts = useSelector(selectCartProducts);
    const totalNum_items = cartProducts.reduce((totnum, itm)=>totnum+itm.quantity, 0);

    return (
        <View style={styles.badgeContainer}>
        {totalNum_items > 0 ? 
            (<View style={styles.badge}>
                <Text style={styles.count}>{totalNum_items}</Text>
            </View>)
        : (<View/>)
        }
        </View>
    );
};

const styles = StyleSheet.create({
    badgeContainer: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    badge: {
        backgroundColor: '#f5ba01',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
    },
    count: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins_500Medium'
    }
})