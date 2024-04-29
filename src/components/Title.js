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
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 32,
        color: '#19274F',
    }
});