import { createStackNavigator } from "@react-navigation/stack";
import { ProductList } from './stackScreens/ProductList';
import { ProductDetails } from './stackScreens/ProductDetail';
import { Categories } from './stackScreens/Categories';

const Stack = createStackNavigator()

export const Products = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product List"
        component={ProductList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Details"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}