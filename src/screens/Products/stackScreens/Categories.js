// Categories.js

import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesData, selectCategories } from '../../../redux/product/categoriesSlice';
import Title from '../../../components/Title';
import { colors } from '../../../constants/colors';
import { Ionicons } from "@expo/vector-icons"; 

export const Categories = ({navigation}) => {
    const dispatch = useDispatch();
    const [delay, setDelay] = useState(true);
    const { categoriesData, loading, error } = useSelector(selectCategories);
    const categoryIcon = ["desktop", "diamond", "barbell", "flower"]
    const productListScreen = (category)=>navigation.navigate({name: 'Product List', params: {productCategory: category}})

    useEffect(()=>{
        dispatch(loadCategoriesData())
        const timer = setTimeout(() => {
            setDelay(false)
        }, 2000); // Show clearly the fetching process
        return () => clearTimeout(timer);
    },[]);

    return (
        <View style={styles.container}>
        {(loading || delay) ? (
            <View style={[{marginVertical: '100%'}]}>
            <ActivityIndicator size="large" color={colors.green}/>
            </View>
        ) : error ? (
            <Text>Error: {error}</Text>
        ) : (
            <View>
                <Title text="Categories"/>
                <View style = {styles.categoryContainer}>
                    {/* Convert Array-like object */}
                    {Array.from(categoriesData).map((category, idx) => {
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
                <View>
                    <Text style={[{color: colors.text}, {marginTop: '40%'}]}>s5273753 - Thien Thao My Bui</Text>
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