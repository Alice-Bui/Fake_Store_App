import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Profile } from "./Profile";

const Stack = createStackNavigator()

export const User = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}