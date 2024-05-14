/// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Products } from "./src/screens/Products/Products";
import { ShoppingCart } from "./src/screens/ShoppingCart/ShoppingCart";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

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
            tabBarStyle: {height: '8%', paddingBottom: 3, paddingTop: 3},
            headerShown: false,
            tabBarActiveTintColor: "#8497ff",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: {fontSize: 16, fontFamily: 'Poppins_500Medium'},
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Products") {
                iconName = focused ? "home" : "home-outline"; 
              } else if (route.name === "My Cart") {
                iconName = focused ? "cart" : "cart-outline";
              }

              return <MaterialCommunityIcons name={iconName} size={35} color={color} />;
            },
          })}
        >
          <Tabs.Screen 
            name="Products" 
            component={Products}/>
          <Tabs.Screen name="My Cart" component={ShoppingCart}/>
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}