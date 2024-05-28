// orderService.js
import { fakeStoreServer } from "./serverSetting";

export const createNewOrder = async(cart, token) => {
    const url = fakeStoreServer + "/orders/neworder";
    try {
        const res = await fetch(url, {
            method: "POST", 
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,            
            },
            body: JSON.stringify(cart)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to create new order: " + error)
    }
};

export const retrieveAllOrders = async(token) => {
    const url = fakeStoreServer + "/orders/all";
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to retrieve orders: " + error)
    }
}

export const updateOrder = async(update, token) => {
    const url = fakeStoreServer + "/orders/updateorder"
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(update)
        });
        const data=await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to update order: " + error)
    }


}
