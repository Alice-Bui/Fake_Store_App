// src/screens/Products/ProductDetails.js
import { StyleSheet, Text, View, ActivityIndicator, Pressable, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../../../components/Title';
import { colors } from '../../../constants/colors';
import { Ionicons } from "@expo/vector-icons"; 
import { fakeStoreServer } from '../../../service/serverSetting';

export const ProductCategories = ({navigation}) => {
    const [isLoading, setLoading] = useState(true)
    const [categories, displayCategories] = useState([]);

    const categoryIcon = ["desktop", "diamond", "barbell", "flower"]
    const productListScreen = (categoryName)=>navigation.navigate({name: 'Product List', params: {category: categoryName}})

    useEffect(()=>{
        const fetchCategories = async() => {
            const url = fakeStoreServer + "/products/categories";
            try {
                const res= await fetch(url)
                const data = await res.json();
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
            <ActivityIndicator size="large" color={colors.green}/>
            </View>
        ) : (<View>
            <Title text="Categories"/>
            <View style = {styles.categoryContainer}>
                {categories.map((category, idx) => {
                    category = category.replace(/\b\w/g, (c)=>c.toUpperCase()).replace(/'\w/g, (c)=>c.toLowerCase());
                    const icon = categoryIcon[idx%4]
                    return (
                        <Pressable 
                        style={({ pressed }) => [styles.category, pressed && styles.pressed]} 
                        key={idx} 
                        onPress={()=>productListScreen(category)}
                        >
                            <Ionicons name={icon} color={colors.red} size="45"/>
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
        backgroundColor: colors.beige,
        paddingHorizontal: '5%',
        paddingVertical: '8%',
    },
    categoryContainer: {
        marginVertical: '5%',
        width: "100%",
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    category: {
        margin: "2.5%",
        width: "45%",
        height: "45%",
        padding: 8,
        backgroundColor: colors.product,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    categoryName: {
        color: colors.text,
        fontFamily: 'Poppins_500Medium',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    pressed: {
        backgroundColor: colors.lightgreen,
    }
});