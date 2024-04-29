import { StyleSheet, Text, View } from 'react-native';

export default Title = function({text}){
  return (
    <View style={[{width: "100%"}, {height: "10%"}, {alignItems: 'center'}]}>
      <Text style={styles.title}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 32,
        color: 'black',
    }
});