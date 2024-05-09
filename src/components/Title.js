import { StyleSheet, Text, View } from 'react-native';

export default Title = function({text}){
  return (
    <View style={styles.titleSection}>
      <Text style={styles.title}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    titleSection: {
        width: '100%',
        paddingTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',      
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 32,
        color: '#19274F',
    }
});