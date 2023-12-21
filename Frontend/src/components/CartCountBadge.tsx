import { useAppSelector } from "../app/hooks"

interface propsType {
    size:string 
}
const CartCountBadge : React.FC<propsType> = ({size}) => {
  const cartItem = useAppSelector(state => state.cart.cartItems)
  // const qtty = cartItem.map(it => it.quantity).reduce((a,b) => a + b,0 )
  return (
    <div>
        <div className={`absolute bg-red-600 text-white text-[14px] ${size} -right-3 -top-1 rounded-full grid place-items-center`}>
            {/* {product.length} */}
            {cartItem.length}
        

        </div>
    </div>
  )
}

export default CartCountBadge