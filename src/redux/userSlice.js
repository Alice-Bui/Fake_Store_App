// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        clearUser: (state) => {
            state.userInfo = {}
        },
        updateUser: (state, action) => {
            state.userInfo.name = action.payload;
        }
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user.userInfo;
export default userSlice.reducer