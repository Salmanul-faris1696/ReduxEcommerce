import { HiOutlineMinus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { decrementQuantity, removeFromCart } from "../Features/Cart/CartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCart } from "../Features/Cart/CartSlice";
import { useEffect, useState } from "react";
import { productImgUrl } from "../utils/urls";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface propsType {
  id: number;
  qtty: number;
}

const CartProduct: React.FC<propsType> = ({ id, qtty }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCart);
  const [prod, setProd] = useState<Product | null>(null);

  useEffect(() => {
    const product = cartItems.find((item) => item.id === id);
    if (product) {
      fetchProductDetails(product.id);
    }
  }, [id, cartItems]);

  const fetchProductDetails = async (id: number) => {
    try {
      const response = await fetch(`${productImgUrl}/${id}`); // Adjust the endpoint as per your API
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setProd(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleRemoveFromCart = () => {
    if (prod) {
      dispatch(removeFromCart(prod.id)); 
    }
  };

  const handleDecrementQuantity = () => {
    if (prod && qtty > 1) {
      dispatch(decrementQuantity(prod.id));
    }
  };

  if (!prod) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="flex justify-between items-center bg-slate-100 relative">
      <div>
        <div className="flex items-center gap-4">
          <img src={`${productImgUrl}/${prod.image}`} alt="" className="h-[100px] m-1" />
          <div className="flex gap-10">
            <h3 className="font-medium">{prod.title}</h3>
            <p className="text-gray-600">{prod.price}</p>
            <RxCross1 onClick={handleRemoveFromCart} className="cursor-pointer absolute top-5 right-5" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 ml-14 mb-5">
          <div className="flex ">Number of items: {qtty} </div>
          {qtty > 1 && (
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
