/// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import Category from "./src/screens/Category";
import ProductList from "./src/screens/ProductList";
import ProductDetail from "./src/screens/ProductDetail";

const Stack = createStackNavigator()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Category">
        <Stack.Screen name="Category" component={Category}/>
        <Stack.Screen name="Product List" component={ProductList}/>
        <Stack.Screen name="Product Detail" component={ProductDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}