import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "./stackScreens/SignIn";
import { SignUp } from "./stackScreens/SignUp";
import { Profile } from "./stackScreens/Profile";

const Stack = createStackNavigator()

export const UserProfile = () => {
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
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}