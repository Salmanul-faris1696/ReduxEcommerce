import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


type CartItem = {
  id: number
  quantity: number
}

interface CartState {
  cartItems: CartItem[]; // Define the type for products array as per your data structure
}

const initialState = {
  cartItems: [],
} as CartState;



export const CartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart :( state: CartState, action: PayloadAction<any>) => {
          const {id,qtty } = action.payload


            if (state.cartItems.find(item => item.id === id) == null) {
              state.cartItems = [...state.cartItems,{id, quantity:qtty ? qtty : 1}]
            }else{
              state.cartItems = state.cartItems.map (item => {
                if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
              } )
            }

        },

         removeFromCart: (state: CartState, action: PayloadAction<any>) => {
          console.log(action.payload);
          
      state.cartItems = state.cartItems.filter(product => product.id !== action.payload.id);
    },

    decrementQuantity:(state ,action) => {
      const {id} = action.payload;
      const existingProduct = state.cartItems.find((product) => product.id === id)

      if(existingProduct){
        if(existingProduct.quantity >1){
          existingProduct.quantity -= 1

        }
        else{
          state.cartItems =state.cartItems.filter((product) => product.id !== id)
        }
      }
    },

    incrementQuantity : (state , action) => {
      const {id} = action.payload;
      const existingProduct = state.cartItems.find((Product) => Product.id === id) 
      if(existingProduct) {
        existingProduct.quantity += 1
      }

    }
        
    }
})

export const {addToCart} = CartSlice.actions

export const {removeFromCart} = CartSlice.actions

export const { decrementQuantity } = CartSlice.actions;

export const { incrementQuantity } = CartSlice.actions;



export const selectCart = (state: RootState) => state.cart.cartItems


export default CartSlice.reducer