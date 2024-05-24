import { createStackNavigator } from "@react-navigation/stack";
import { ProductList } from './ProductList';
import { ProductDetails } from './ProductDetail';
import { ProductCategories } from './ProductCategories';

const Stack = createStackNavigator()

export const Products = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product Categories"
        component={ProductCategories}
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