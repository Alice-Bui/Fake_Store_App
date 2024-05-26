/// App.js
import React from "react";
import { View, Alert } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import store from "./src/redux/store";
import { Products } from "./src/screens/Products/Products";
import { ShoppingCart } from "./src/screens/ShoppingCart/ShoppingCart";
import { UserProfile } from "./src/screens/UserProfile/UserProfile";
import { MyOrders } from "./src/screens/MyOrders/MyOrders";
import { colors } from "./src/constants/colors";

import { useSelector } from "react-redux";
import { selectUser } from "./src/redux/userSlice";
import { selectCartProducts } from "./src/redux/cartSlice";

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
  const user = useSelector(selectUser);
  const cartProducts = useSelector(selectCartProducts);
  const totalNum_items = cartProducts.reduce((totnum, itm)=>totnum+itm.quantity, 0);

  return (
    <Tabs.Navigator
      initialRouteName="User Profile"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: "9%",
          paddingBottom: 20,
          paddingTop: 3,
          backgroundColor: colors.green,
        },
        headerShown: false,
        tabBarActiveTintColor: colors.tab,
        tabBarInactiveTintColor: colors.tab,
        tabBarLabelStyle: { fontSize: 14, fontFamily: "Poppins_500Medium" },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Products") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "My Cart") {
            iconName = focused ? "cart" : "cart-outline";
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === "User Profile") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "My Orders") {
            iconName = focused ? "receipt" : "receipt-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
      screenListeners={({ route }) => ({
        tabPress: (e) => {
          if (!user && route.name != "User Profile") {
            e.preventDefault();
            Alert.alert(
              "You need to be signed in to access this section. Please sign in or sign up to continue."
            );
          }
        },
      })}
    >
      <Tabs.Screen name="Products" component={Products} />
      <Tabs.Screen name="My Cart" component={ShoppingCart} 
      options={{ 
        tabBarBadge: totalNum_items > 0 && user ? totalNum_items : null, 
        tabBarBadgeStyle: {
          backgroundColor: colors.red,
          fontFamily: 'Poppins_500Medium',
          color: 'white'
        }
      }}/>
      <Tabs.Screen name="My Orders" component={MyOrders} />
      <Tabs.Screen name="User Profile" component={UserProfile} />
    </Tabs.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </Provider>
  );
}
