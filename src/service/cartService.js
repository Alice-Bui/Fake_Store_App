// authService.js
import { fakeStoreServer } from "./serverSetting";

const url = fakeStoreServer + "/cart";

export const retrieveUserCart = async(token) => {
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to retrieve cart" + error)
    }
}

export const updateUserCart = async(cart, token) => {
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(cart),
        });
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        throw new Error("Failed to update cart" + error)
    }
}