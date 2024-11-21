import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        id: null,
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token; // Save token from the payload
            state.id = action.payload.id;       // Save id from the payload
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.id = null; // Clear id on logout
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
