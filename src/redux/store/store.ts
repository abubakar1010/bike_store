import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE,REHYDRATE,REGISTER, persistReducer, persistStore } from "redux-persist";
import { authReducer } from "../features/auth/authSlice";


const persistConfig = {
    key: "bike-store-auth",
    storage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer:{
        auth: persistedAuthReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions: [PAUSE, PERSIST,FLUSH,PURGE, REGISTER, REHYDRATE ]
        }
    }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)