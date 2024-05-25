// authService.js
import { fakeStoreServer } from "./serverSetting";

export const signUpUser = async ({ name, email, password }) => {
    const url = fakeStoreServer + "/users/signup";
    const user = { name, email, password };
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to sign up user: " + error);
    }
}

export const signInUser = async({ email, password }) => {
    const url = fakeStoreServer + "/users/signin";
    const user = { email, password };
    try {
        const res = await fetch(url, {
            method: "POST", 
            mode: "cors",
            headers: {
                "Content-Type": "application/json",            
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        return data; // with data.token as the token value
    } catch (error) {
        throw new Error("Failed to sign in: " + error)
    }
};

export const updateUserProfile = async ({ token, name, password }) => {
    const url = fakeStoreServer + "/users/update";
    const user = { name, password };
    try {
        const res = await fetch(url, {
            method: "POST", 
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,            
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to update: " + error)
    }
};
