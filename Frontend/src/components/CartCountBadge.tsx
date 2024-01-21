import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getAllCartItems } from "../Features/Cart/CartSliceAsync";

interface propsType {
    size:string 
}
const CartCountBadge : React.FC<propsType> = ({size}) => {
 const dispatch = useAppDispatch();
//   const { cartItems: products } = useAppSelector(state => state.cart);
 useEffect(() => {

    // if (userId) {
      dispatch(getAllCartItems()); // Pass the userId to fetchCartItems
    // }
  }, []);

const {cartItems} = useAppSelector(state => state.cartSliceAsync)
  // const qtty = cartItem.map(it => it.quantity).reduce((a,b) => a + b,0 )
  return (
    <div>
        <div className={`absolute bg-red-600 text-white text-[14px] ${size} -right-3 -top-1 rounded-full grid place-items-center`}>
            {/* {product.length} */}
            {cartItems.length}
        

        </div>
    </div>
  )
}

export default CartCountBadge