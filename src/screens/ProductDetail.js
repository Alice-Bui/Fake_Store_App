import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

const url = 'https://fakestoreapi.com/products/'
export default function ProductList({navigation, route}) {
    const [product, setProduct] = useState('');
    const [productDetails, displayProductDetails] = useState('')
    
    const productListScreen = ()=>navigation.navigate('Product List')
    
    //Listen for changes to {category} from Category Screen
    useEffect(()=> {
        if (route.params?.product) {
            setProduct(route.params?.product);
        }
    }, [route.params?.category]);

    useEffect(()=>{
        const fetchProductDetails = async()=>{
            try {
                if (product != ''){
                    const res= await fetch(url+product)
                    const data = await res.json();
                    displayProductDetails(data)
                }
            } catch(error) {
                console.error('error fetch address ', error);
                return {};
            }
        }
        fetchProductDetails()
    }, [product])

    return (
        <View style={styles.container}>
            <Title text="Product Details"/>
            {productDetails && (<View>
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
                            <Text style={styles.textValue}> {productDetails.price}</Text>
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <Button text="Back" name="backspace" f={productListScreen}/>
                        <Button text="Add to Cart" name="cart"/>
                    </View>

                    <View style={styles.description}>
                        <ScrollView>
                            <Text style={styles.desText}>{productDetails.description}</Text>
                        </ScrollView>
                    </View>
                </View>
            </View>)}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FD',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '7%',
  },
  productDetailsContainer: {
    height: '35%',
    backgroundColor: 'white',
    marginVertical: '5%',
    justifyContent: 'center',
    borderRadius: 15,
  },
  productImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  detailsText: {
    width: '100%',
    height: '50%',
    borderRadius: 15,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#19274F',
  },
  detailsNumber: {
    backgroundColor: '#DFEDFF',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    marginVertical: '5%'
  },
  textKey: {
    color: '#19274F',
    fontFamily: 'Poppins_600SemiBold'
  },
  textValue: {
    fontFamily: 'Poppins_500Medium'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  description: {
    marginTop: '5%',
    height: '65%',
    backgroundColor: '#E3E7FF',
    borderRadius: 5,
    padding: '3%'
  },
  desText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular'
  }

});