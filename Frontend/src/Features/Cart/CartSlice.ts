import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { BASE_URL } from "../../utils/axios";

interface CartItem {
  id: number;
  quantity: number;
}

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
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update its quantity
        existingItem.quantity += quantity || 1;
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartItems.push({ id, quantity: quantity || 1 });
      }
    },
    // ... other reducer actions like removeFromCart, decrementQuantity, incrementQuantity, etc.
  
    removeFromCart: (state :CartState, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== idToRemove);
    },

    decrementQuantity: (state:CartState, action: PayloadAction<number>) => {
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

export const fetchCartItems = () => async (dispatch: any) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`);
    const data = await response.json();
    dispatch(setCartItems(data));
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

export const selectCart = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
