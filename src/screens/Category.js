import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Title from '../components/Title';

const url = 'https://fakestoreapi.com/products/categories'
export default function Home({navigation}) {
  const [isLoading, setLoading] = useState(true)
  const [categories, displayCategories] = useState([]);
  const categoryColor = ["#575FCE", "#7E8ADC", "#F6768D", "#EE5776"];

  const productListScreen = (categoryName)=>navigation.navigate({name: 'Product List', params: {category: categoryName}})

  useEffect(()=>{
    const fetchCategories = async() => {
        try {
            const res= await fetch(url)
            const data = await res.json();
            console.log(data)
            displayCategories(data)
        } catch(error) {
            console.error('error fetch address ', error);
        } finally {
          setLoading(false);
        }
    };
    fetchCategories()
  },[])


  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={[{marginVertical: '75%'}]}>
          <ActivityIndicator size="large" color="#8497ff"/>
        </View>
      ) : (<View>
          <Title text="Categories"/>
          <View style = {styles.categoryContainer}>
            {categories.map((category, idx) => {
                category = category.replace(/\b\w/g, (c)=>c.toUpperCase()).replace(/'\w/g, (c)=>c.toLowerCase());
                const color = categoryColor[idx%4]
                return (
                    <Pressable style={[styles.category, {backgroundColor: color}]} key={idx} onPress={()=>productListScreen(category)}>
                        <Text style={styles.categoryName}>{category}</Text>
                    </Pressable>
                )
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FD',
    paddingHorizontal: '5%',
    paddingVertical: '7%',
  },
  categoryContainer: {
    marginVertical: '5%',
    width: "100%",
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  category: {
    margin: "2%",
    width: "45%",
    height: "45%",
    padding: 8,
    backgroundColor: "#8497FF",
    borderRadius: 6,
    justifyContent: 'center',
  },
  categoryName: {
    color: "white",
    fontFamily: 'Poppins_500Medium',
    fontSize: 22,
    textAlign: 'center'
  }
});