// handleSignIn.js

import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { setUser } from "../redux/userSlice";
import { retrieveUserCart, updateUserCart } from "./cartService";

export const handleSignIn = (user, dispatch) => {
    dispatch(setUser(user));

    const fetchCart = async() => {
        try {
            const result = await retrieveUserCart(user.token);
            if (result.status === "error") {
                Alert.alert(result.message);
            } else {
                dispatch(setCart(result.items));
            }
        } catch (error) {
            console.error("Fetch cart failed: ", error);
            Alert.alert("Failed to retrieve user's cart");
        }
    }
    fetchCart();
}
