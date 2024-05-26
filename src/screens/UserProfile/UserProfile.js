import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "./stackScreens/SignIn";
import { SignUp } from "./stackScreens/SignUp";
import { Profile } from "./stackScreens/Profile";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";

const Stack = createStackNavigator()

export const UserProfile = () => {
  const user = useSelector(selectUser)

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Group>
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
        </Stack.Group>
      ): (
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  )
}