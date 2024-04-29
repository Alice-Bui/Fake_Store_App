import { StyleSheet, Text, View, Pressable } from 'react-native';
import Title from '../components/Title';

export default function Home() {

  return (
    <View style={styles.container}>
      <Title text="Product Details"/>
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