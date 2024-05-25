import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export const Profile = ({navigation, route}) => {
  //Listen for changes to {category} from Category Screen
  const [user, setUser] = useState({});

  useEffect(()=> {
    if (route.params?.user) {
        setUser(route.params?.user);
    }
}, [route.params?.user]);

  return (
    <View style={styles.container}>
      <Text>Welcome {user.name} to your page</Text>
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
