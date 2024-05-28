// ProductList.js

import { StyleSheet, Text, View, Pressable, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductListData, selectProductList } from '../../../redux/product/productListSlice';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import { colors } from '../../../constants/colors';

export const ProductList = ({navigation, route}) => {    
    const [productCategory, setProductCategory] = useState(route.params.productCategory)
    const dispatch = useDispatch();
    const [delay, setDelay] = useState(true);
    const { productListData, loading, error } = useSelector(selectProductList); 
    const CategoriesScreen = ()=>navigation.navigate('Categories')
    const productDetailScreen = (id)=>navigation.navigate({name: 'Product Details', params: {productId: id}})

    useEffect(()=> {
        if (route.params?.productCategory) {
            setProductCategory(route.params?.productCategory);
        }
    }, [route.params?.productCategory]);

    const loadProductListIfRequired = () => {
        if (!productListData[productCategory]) {
            dispatch(loadProductListData(productCategory));
            const timer = setTimeout(() => {
                setDelay(false)
            }, 2000); 
            return () => clearTimeout(timer);
        } else {
            setDelay(false)
        }
    };

    useEffect(() => {
        loadProductListIfRequired();
    }, [productCategory]);

    return (
        <View style={styles.container}>
            <Title text={productCategory}/>
            <View style = {styles.productContainer}>
                {(loading || delay) ? (
                    <ActivityIndicator size="large" color={colors.green}/>
                ) : error ? (
                    <Text>Error: {error}</Text>
                ) : (
                    <FlatList
                    data={productListData[productCategory]}
                    renderItem={({item}) => (
                        <Pressable 
                            style={({ pressed }) => [styles.product, pressed && styles.pressed]} 
                            onPress={()=>productDetailScreen(item.id)}
                        >
                            <Image source={{uri: item.image}} style={styles.productImage}/>
                            <View style={styles.productText}>
                                <Text style={styles.productName}>{item.title}</Text>
                                <Text style={styles.productPrice}>Price:
                                    <Text style={styles.productName}> ${item.price}</Text>
                                </Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
                    />
                )}
            </View>
            <View>
                <Button text="Back" name="backspace" color={colors.green} f={CategoriesScreen} width={170}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
  },
  productContainer: {
    width: '100%',
    height: '77%',
    justifyContent: 'center',
  },
  product: {
    margin: '2%',
    padding: '2%',
    backgroundColor: 'white',
    flexDirection: 'row',
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
  pressed: {
    backgroundColor: colors.lightgreen,
  }
});