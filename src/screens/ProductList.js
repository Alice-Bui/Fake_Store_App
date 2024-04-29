import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Title from '../components/Title';

export default function ProductList({navigation, route}) {
    const [category, setCategory] = useState();

    useEffect(()=> {
        if (route.params?.category) {
            setCategory(route.params?.category);
        }
    }, [route.params?.category])

    return (
        <View style={styles.container}>
            <Title text={category}/>
            <View style = {[{width: "100%"}, {height: "7%"}]}>
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
    paddingVertical: '5%',
  }
});