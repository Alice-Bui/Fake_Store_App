// ProductDetails.js

import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { loadProductData, selectProductData} from '../../../redux/product/productSlice';
import { selectCart, addProductToCart } from '../../../redux/cartSlice';
import { updateUserCart } from '../../../service/cartService';
import { selectUser } from '../../../redux/userSlice';
import { colors } from '../../../constants/colors';

export const ProductDetails = ({navigation, route}) => {
    const [productId, setProductId] = useState(route.params.productId);
    const dispatch = useDispatch();
    const [delay, setDelay] = useState(true);
    const { productData, loading, error } = useSelector(selectProductData);
    const cart = useSelector(selectCart);
    const user = useSelector(selectUser);
    
    const productListScreen = ()=>navigation.navigate({name: 'Product List', params: {productCategory: productData[productId].category}})
    
    useEffect(()=> {
        if (route.params?.productId) {
            setProductId(route.params?.productId);
        }
    }, [route.params?.productId]);

    const loadProductIfRequired = () => {
      if (!productData[productId]) {
          dispatch(loadProductData(productId));
          const timer = setTimeout(() => {
              setDelay(false)
          }, 2000); 
          return () => clearTimeout(timer);
      } else {
          setDelay(false)
      }
    };

    useEffect(() => {
      loadProductIfRequired();
    }, [productId]);

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
    
    const handleAddToCart = () => {
      dispatch(addProductToCart(productData[productId]));
    };

    return (
        <View style={styles.container}>
            <Title text="Product Details"/>
            {(loading || delay) ? (
                <View style={[{marginVertical: '90%'}]}>
                    <ActivityIndicator size="large" color={colors.green}/>
                </View>
            ) : error ? (
              <Text>Error: {error}</Text>
            ) : (
                <View>
                    <View style={styles.productDetailsContainer}>
                        <Image source={{uri: productData[productId].image}} style={styles.productImage}/>
                    </View>
                    <View style={styles.detailsText}>
                        <Text style={styles.productTitle}>{productData[productId].title}</Text>
                        
                        <View style={styles.detailsNumber}>
                            <Text style={styles.textKey}>Rate: 
                                <Text style={styles.textValue}> {productData[productId].rating.rate}</Text>
                            </Text>
                            <Text style={styles.textKey}>Sold: 
                                <Text style={styles.textValue}> {productData[productId].rating.count}</Text>
                            </Text>
                            <Text style={styles.textKey}>Price: 
                                <Text style={styles.textValue}> ${productData[productId].price}</Text>
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
                                    <Text style={styles.desText}>{productData[productId].description}</Text>
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