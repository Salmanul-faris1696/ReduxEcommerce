import { AiFillStar, AiOutlineShopping, AiOutlineStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { addToCart } from "../Features/Cart/CartSliceAsync";
import { useAppDispatch } from "../app/hooks";
import { productImgUrl } from "../utils/urls";

interface propsType {
  id: string
  image :string
  title: string
  price : string
}

const FeatureCard: React.FC<propsType> = ({ id, image , title, price }) => {
  const dispatch = useAppDispatch();

  // const userID :any = Cookies.get('userID')
  return (
    <div className="border  hover:border-gray-800 hover:scale-105 transition-transform rounded-lg w-[350px] h-[400px] flex flex-col ">
      <Link to={`/product/${id}`} className='flex-2  bg-red-300 overflow-hidden'>
        <img src={`${productImgUrl}/${image}`} width={50} alt={title} className="h-[100px]"/>
      </Link>

      <div className="space-y-2 relative p-4 flex-1">
        <div className="text-yellow-400 flex gap-[2px] text-[20px] ">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <h3 className="font-medium">{title}</h3>
        <h3 className="text-2xl font-medium text-red-600 flex items-center gap-3">{price}</h3>
        <button className="absolute -top-4 right-2 bg-accent text-white text-[28px] w-[50px] h-[50px] rounded-full grid items-center  justify-center cursor-pointer" onClick={() => dispatch(addToCart({productId:id,quantity: 1}))}>
          <AiOutlineShopping />
        </button>
      </div>
    </div>
  );
}

export default FeatureCard;
