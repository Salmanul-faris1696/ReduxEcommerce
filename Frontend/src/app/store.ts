import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/CartSlice"
import cartAsyncReducer from "../Features/Cart/CartSliceAsync"

const store = configureStore({
     reducer: {
          cart: cartReducer,
          cartSliceAsync: cartAsyncReducer


     }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store