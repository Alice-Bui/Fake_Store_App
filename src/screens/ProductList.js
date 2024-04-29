import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';

const url = 'https://fakestoreapi.com/products/category/'
export default function ProductList({navigation, route}) {
    const [category, setCategory] = useState('');
    const [products, displayProducts] = useState([]);
    
    const categoryScreen = ()=>navigation.navigate('Category')
    //Listen for changes to {category} from Category Screen
    useEffect(()=> {
        if (route.params?.category) {
            setCategory(route.params?.category);
        }
    }, [route.params?.category]);

    useEffect(()=>{
        const fetchProducts = async()=>{
            try {
                if (category != ''){
                    const categoryName = await category.toLowerCase().replaceAll(" ", "%20")
                    const res= await fetch(url+categoryName)
                    const data = await res.json();
                    displayProducts(data)
                }
            } catch(error) {
                console.error('error fetch address ', error);
                return [];
            }
        }
        fetchProducts()
    }, [category])

    /*<FlatList
                    data={products}
                    renderItem={({product}) => {
                        <View style={styles.productContainer}>
                            <Text style={styles.productName}>{product.title}</Text>
                        </View>
                    }}
                    keyExtractor={(product, idx) => idx}
                />*/

    return (
        <View style={styles.container}>
            <Title text={category}/>
            <View style = {styles.productContainer}>
                <FlatList
                    data={products}
                    renderItem={({item}) => (
                        <View style={styles.product}>
                            <Image source={{uri: item.image}} style={styles.productImage}/>
                            <View style={styles.productText}>
                                <Text style={styles.productName}>
                                    {item.title}
                                </Text>
                                <Text style={styles.productPrice}>
                                    Price: €{item.price}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    />
            </View>
            <View style={[{height: '10%'}]}>
                <Button text="Back" name="content-save-check" color="#8497ff" f={categoryScreen}/>
            </View>

        </View>
    );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FD',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    paddingVertical: '7%',
  },
  productContainer: {
    width: '100%',
    height: '75%',
  },
  product: {
    margin: '2%',
    padding: '2%',
    backgroundColor: 'white',
    borderRadius: 6,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#19274F'
  },
  productText: {
    width: '75%',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#19274F'
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#8497ff'
  },
  productImage: {
    width: '23%',
    height: 85,
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: '2%',
  }
});