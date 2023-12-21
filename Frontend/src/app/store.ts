import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/CartSlice"

const store = configureStore({
     reducer:{
          cart:cartReducer
          
        
     }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store