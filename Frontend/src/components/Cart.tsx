// Cart.tsx

import { RxCross1 } from 'react-icons/rx';
import { useAppSelector } from '../app/hooks';
import CartProduct from './CartProduct';

const Cart = ({ setShowCart }: any) => {
  const { cartItems: products } = useAppSelector(state => state.cart);

  return (
    <div className='bg-[#0000007d] w-full h-screen fixed left-0 top-0 z-20' onClick={() => setShowCart(false)}>
      <div className='max-w-[400px] w-full h-full bg-white absolute right-0 top-0 p-6' onClick={(e) => e.stopPropagation()}>
        <RxCross1 className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer" onClick={() => setShowCart(false)} />
        <h3 className='pt-6 text-lg font-medium text-gray-600 uppercase'>Your cart</h3>
        {products.length === 0 ? (
          <p className='text-center text-gray-500 mt-4'>Your cart is empty.</p>
        ) : (
          <div className='mt-6 grid gap-2'>
            {products.map((item: any) => (
              <CartProduct
                key={item.id}
                id={item.id}
                qtty={item.quantity}
              />
            ))}
          </div>
        )}
        {/* Existing buttons */}
        {/* ... */}
      </div>
    </div>
  );
}

export default Cart;
