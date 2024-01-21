import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ApiClientPrivate } from "../../utils/axios";

interface CartData {
    productId: string;
    quantity: number
}

interface Product {
    _id: string;
    title: string;
    image: string;
}

interface CartItem {
    id: number;
    quantity: number;
    image: string
    title: string

}
// const dispatch = useDispatch()
interface CartState {
    cartItems: CartItem[];
    isLoading: boolean;
    error: string
}




export const addToCart = createAsyncThunk(
    'carts/addToCart', async ({ productId, quantity }: CartData) => {
        try {
            const response = await ApiClientPrivate.post(`/carts`, { productId, quantity })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getAllCartItems = createAsyncThunk(
    'carts/getCartItems', async () => {
        try {
            const response = await ApiClientPrivate.get(`/carts`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'carts/removeFromCart', async ({ productId, removeEntirely, quantity }: { productId: string, removeEntirely: boolean, quantity: number }) => {
        // console.log("check", productId, removeEntirely, quantity)
        try {
            const response = await ApiClientPrivate.delete(`/carts/${productId}`, { data: { quantity, removeEntirely } })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)



const initialState: CartState = {
    cartItems: [],
    isLoading: false,
    error: ''

};

export const cartSliceAsync = createSlice({
    name: "cartSliceAsync",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true

        })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log("payload :", action.payload);
                const cartItems: CartItem[] = action.payload.cartItems.map((it: any) => ({
                    id: it.product._id,
                    quantity: it.quantity,
                    title: it.product.title,
                    image: it.product.image

                }))


                state.isLoading = false
                state.cartItems = cartItems
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false
                state.error = 'an error occured'

            }).addCase(getAllCartItems.fulfilled, (state, action) => {
                console.log("payload get cart: ", action.payload);

                state.cartItems = action.payload.cartItems.map((it: any) => ({
                    id: it.product._id,
                    quantity: it.quantity,
                    title: it.product.title,
                    image: it.product.image

                }))
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                console.log("122", action.payload);


                const updatedCartItems: CartItem[] = action.payload.cartItems.map((it: any) => ({
                    id: it.product._id,
                    quantity: it.quantity,
                    title: it.product.title,
                    image: it.product.image
                }));

                state.isLoading = false;
                state.cartItems = [...updatedCartItems];
            });

    },

})

export const { } = cartSliceAsync.actions

export const cartItems = (state: RootState) => state.cartSliceAsync.cartItems;
export const isLoading = (state: RootState) => state.cartSliceAsync.isLoading;
export const error = (state: RootState) => state.cartSliceAsync.error;

export default cartSliceAsync.reducer;