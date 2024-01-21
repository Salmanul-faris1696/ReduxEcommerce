import React from 'react';
import { HiOutlineMinus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { getAllCartItems, removeFromCart } from "../Features/Cart/CartSliceAsync";
import { useAppDispatch } from '../app/hooks';
import { productImgUrl } from '../utils/urls';

interface CartProductProps {
  productId: string;
  quantity: number;
  title: string;
  image: string;
  isLoading:boolean;
  removeEntirely:boolean
  
}

const CartProduct: React.FC<CartProductProps> = ({
  productId,
  quantity,
  title,
  image,
  isLoading,
 
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = async () => {
    try {
      const payload = { productId, removeEntirely: true, quantity };
      // console.log('Remove from cart payload:', payload);
      await dispatch(removeFromCart(payload));

      dispatch(getAllCartItems())
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };


    const handleDecrementQuantity = async () => {
    try {
      const payload = { productId, removeEntirely: false, quantity: 1 };
      // console.log('Decrement quantity payload:', payload);
      await dispatch(removeFromCart(payload));
      dispatch(getAllCartItems());
    } catch (error) {
      console.error('Error decrementing item quantity:', error);
    }
  }
  if (isLoading) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="flex justify-between items-center bg-slate-100 relative">
      <div>
        <div className="flex items-center gap-4">
          <img
            src={`${productImgUrl}/${image}`}
            alt=""
            className="h-[100px] m-1"
          />
          <div className="flex gap-10">
            <h3 className="font-medium">{title}</h3>
            <RxCross1 onClick={handleRemoveFromCart} className="cursor-pointer absolute top-5 right-5" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 ml-14 mb-5">
          <div className="flex">Number of items: {quantity}</div>
          {quantity > 1 && (
            <button
            onClick={handleDecrementQuantity}
              className="border  p-1 bg-red-700 rounded-md hover:scale-105 text-white"
            >
              <HiOutlineMinus />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;