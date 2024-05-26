// src/screens/Products/ProductDetails.js
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../../redux/cartSlice';
import { colors } from '../../../constants/colors';
import { fakeStoreServer } from '../../../service/serverSetting';

export const ProductDetails = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    
    const [product, setProduct] = useState('');
    const [productDetails, displayProductDetails] = useState('')

    const dispatch = useDispatch();
    
    const productListScreen = ()=>navigation.navigate('Product List')
    
    //Listen for changes to {category} from Category Screen
    useEffect(()=> {
        if (route.params?.product) {
            setProduct(route.params?.product);
        }
    }, [route.params?.category]);

    useEffect(()=>{
        const fetchProductDetails = async()=>{
            const url = fakeStoreServer + "/products/";
            try {
                if (product != ''){
                    const res= await fetch(url+product)
                    const data = await res.json();
                    displayProductDetails(data)
                }
            } catch(error) {
                console.error('error fetch address ', error);
                return {};
            } finally {
                setLoading(false)
            }
        }
        const timer = setTimeout(() => {
            fetchProductDetails()
        }, 1000); //Delay 1 second
        return () => clearTimeout(timer);
    }, [product]);

    const handleAddToCart = () => {
      dispatch(addProductToCart(productDetails));
    };

    return (
        <View style={styles.container}>
            <Title text="Product Details"/>
            {isLoading ? (
                <View style={[{marginVertical: '100%'}]}>
                    <ActivityIndicator size="large" color={colors.green}/>
                </View>
            ) : (
                <View>
                    <View style={styles.productDetailsContainer}>
                        <Image source={{uri: productDetails.image}} style={styles.productImage}/>
                    </View>
                    <View style={styles.detailsText}>
                        <Text style={styles.productTitle}>{productDetails.title}</Text>
                        
                        <View style={styles.detailsNumber}>
                            <Text style={styles.textKey}>Rate: 
                                <Text style={styles.textValue}> {productDetails.rating.rate}</Text>
                            </Text>
                            <Text style={styles.textKey}>Sold: 
                                <Text style={styles.textValue}> {productDetails.rating.count}</Text>
                            </Text>
                            <Text style={styles.textKey}>Price: 
                                <Text style={styles.textValue}> ${productDetails.price}</Text>
                            </Text>
                        </View>

                        <View style={styles.button}>
                            <Button text="Back" name="backspace" color={colors.green} width={170} f={productListScreen}/>
                            <Button text="Add to Cart" name="cart" color={colors.red} width={170} f={handleAddToCart}/>
                        </View>

                        <View style={styles.description}>
                            <Text style={styles.descriptionTitle}>Description:</Text>
                            <View style={styles.descriptionText}>
                                <ScrollView>
                                    <Text style={styles.desText}>{productDetails.description}</Text>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
  },
  productDetailsContainer: {
    height: '35%',
    backgroundColor: colors.product,
    marginVertical: '5%',
    justifyContent: 'center',
    borderRadius: 15,
  },
  productImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
    backgroundColor: colors.product,
  },
  detailsText: {
    width: '100%',
    height: '50%',
    borderRadius: 15,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  detailsNumber: {
    backgroundColor: colors.lightgreen,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    marginVertical: '5%',
  },
  textKey: {
    color: colors.text,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14
  },
  textValue: {
    fontFamily: 'Poppins_500Medium',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  description: {
    marginTop: '5%',
    height: '55%',
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: colors.text
  },
  descriptionText: {
    backgroundColor: colors.beige,
    borderRadius: 5,
    padding: '3%'
  },
  desText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: colors.text
  }

});