/// App.js
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import store from './src/redux/store';
import CartBadge from './src/components/Badge';
import { Products } from "./src/screens/Products/Products";
import { ShoppingCart } from "./src/screens/ShoppingCart/ShoppingCart";
import { UserProfile } from "./src/screens/User/UserProfile";
import { MyOrders } from './src/screens/MyOrders/MyOrders';
import { colors } from './src/constants/screenColors';

const Tabs = createBottomTabNavigator();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium, Poppins_700Bold
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({route}) => ({
            tabBarStyle: {height: '9%', paddingBottom: 15, paddingTop: 3, backgroundColor: colors.green},
            headerShown: false,
            tabBarActiveTintColor: colors.tab,
            tabBarInactiveTintColor: colors.tab,
            tabBarLabelStyle: {fontSize: 14, fontFamily: 'Poppins_500Medium'},
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Products") {
                iconName = focused ? "home" : "home-outline"; 
                return <Ionicons name={iconName} size={30} color={color} />;
              } else if (route.name === "My Cart") {
                iconName = focused ? "cart" : "cart-outline";
                ///Cart Badge
                return (
                  <View>
                    <Ionicons name={iconName} size={30} color={color} />
                    <CartBadge />
                  </View>
                )
              } else if (route.name === "User Profile") {
                iconName = focused ? "person" : "person-outline"; 
                return <Ionicons name={iconName} size={30} color={color} />;
              } else if (route.name === "My Orders") {
                iconName = focused ? "receipt" : "receipt-outline"; 
                return <Ionicons name={iconName} size={30} color={color} />;
              }
            },
          })}
        >
          <Tabs.Screen name="Products" component={Products}/>
          <Tabs.Screen name="My Cart" component={ShoppingCart}/>
          <Tabs.Screen name="User Profile" component={UserProfile}/>
          <Tabs.Screen name="My Orders" component={MyOrders}/>
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}