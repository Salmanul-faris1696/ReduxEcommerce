import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ApiClientPrivate, BASE_URL } from "../../utils/axios";
import { useAppDispatch } from "../../app/hooks";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

interface CartItem {
  id: number;
  quantity: number;
  image: string
  title: string

}
// const dispatch = useDispatch()
interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity, image, title } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update its quantity
        existingItem.quantity += quantity || 1;
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartItems.push({ id, image, title, quantity: quantity || 1 });
      }
    },
    // ... other reducer actions like removeFromCart, decrementQuantity, incrementQuantity, etc.

    removeFromCart: (state: CartState, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== idToRemove);
    },

    decrementQuantity: (state: CartState, action: PayloadAction<number>) => {
      const idToDecrement = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === idToDecrement);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const idToIncrement = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === idToIncrement);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  setCartItems,

} = cartSlice.actions;

export const fetchCartItems = async (userId: string) => {
  console.log('clicked')
  try {
    const response = await fetch(`${BASE_URL}/carts/${userId}`);
    const data = await response.json();
    // dispatch(setCartItems(data.products));
    console.log(data);

  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

interface CartData {
  productId: string;
  quantity: number
}
export const createCart = async (data: CartData) => {
  try {
    const response = await ApiClientPrivate.post(`${BASE_URL}/carts`, data
    )
    return response.data;
  } catch (error: any) {
    throw new Error(error.message)
  }

}

export const selectCart = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
