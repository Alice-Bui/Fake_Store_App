import { StyleSheet, Text, View, Pressable, FlatList, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';

const url = 'https://fakestoreapi.com/products/category/'
export const ProductList = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    
    const [category, setCategory] = useState('');
    const [products, displayProducts] = useState([]);
    
    const categoryScreen = ()=>navigation.navigate('Categories')
    const productDetailScreen = (productID)=>navigation.navigate({name: 'Product Details', params: {product: productID}})
    
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
            } finally {
                setLoading(false)
            }
        }

        const timer = setTimeout(() => {
            fetchProducts();
        }, 1000); //Delay 1 second
        return () => clearTimeout(timer);
    }, [category]);

    return (
        <View style={styles.container}>
            <Title text={category}/>
            <View style = {styles.productContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#8497ff"/>
                    ) : (
                    <FlatList
                        data={products}
                        renderItem={({item}) => (
                            <Pressable style={styles.product} onPress={()=>productDetailScreen(item.id)}>
                                <Image source={{uri: item.image}} style={styles.productImage}/>
                                <View style={styles.productText}>
                                    <Text style={styles.productName}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.productPrice}>
                                        Price: €{item.price}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
            <View>
                <Button text="Back" name="backspace" f={categoryScreen}/>
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
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  productContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center'
  },
  product: {
    margin: '2%',
    padding: '2%',
    backgroundColor: 'white',
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