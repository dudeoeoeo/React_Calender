import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"

interface AuthState {
    name: string,
    email: string,
    phone: string,
    password: string,
}

interface AuthInfo {
    authInfo: {
        name: string,
        email: string,
        phone: string,
        password: string,
    }
}

const initialState: AuthInfo = {
    authInfo: null,
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthInfo>) => {
            state.authInfo = action.payload.authInfo
        },
    }
});

const { setAuth } = auth.actions;

// export const getAuth = createSelector({
//     state => state.auth.authInfo,
//     info => info,
// })

export default auth.reducer;