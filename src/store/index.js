import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token'),
    isLoggedIn: (localStorage.getItem('token') ? true : false)
}

const slice = createSlice({
    name: 'slice',
    initialState:  initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        },
        login(state, action) {
            state.token = action.payload.idToken;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.idToken);
        },
    }
})

const store = configureStore({
    reducer: slice.reducer
})

export const sliceActions = slice.actions;

export default store;