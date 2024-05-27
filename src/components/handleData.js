// handleSignIn.js

import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { setCart } from "../redux/cartSlice";
import { setUser } from "../redux/userSlice";
import { setOrders } from "../redux/orderSlice";
import { retrieveUserCart} from "../service/cartService";
import { retrieveAllOrders } from "../service/orderService";

export const fetchOrders = async(user, dispatch) => {
    try {
        const result = await retrieveAllOrders(user.token);
        if (result.status === "error") {
            Alert.alert(result.message);
        } else {
            console.log(result.orders)
            dispatch(setOrders(result.orders));
        }
    } catch (error) {
        console.error("Fetch orders failed: ", error);
        Alert.alert("Failed to retrieve user's orders");
    }
};

export const fetchCart = async(user, dispatch) => {
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
};

export const handleSignIn = (user, dispatch) => {
    dispatch(setUser(user));
    fetchCart(user, dispatch);
    fetchOrders(user, dispatch);
}
