import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Title from '../components/Title';

const url = 'https://fakestoreapi.com/products/categories'
export default function Home({navigation, route}) {
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
            return [];
        }
    }
    fetchCategories()
  },[])


  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3FD',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '7%'
  },
  categoryContainer: {
    marginVertical: '10%',
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
    fontSize: 24,
    textAlign: 'center'
  }
});