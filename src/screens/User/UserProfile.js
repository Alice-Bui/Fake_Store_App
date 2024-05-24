import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SignIn, SimpleForm } from "./SignIn"
export const UserProfile = () => {
  return (
    <View style={styles.container}>
      <SignIn />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F3FD",
    alignItems: "center",
    justifyContent: "center",
  },
});
