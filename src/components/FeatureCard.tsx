import { AiFillStar, AiOutlineShopping, AiOutlineStar } from "react-icons/ai";
// import { useCartContext } from "../context/CartContext";
import { addToCart } from "../Features/Cart/CartSlice";
import { useAppDispatch } from "../app/hooks";
import { Link } from 'react-router-dom';

interface propsType {
    id: number
    img :string
    name: string
    price : string
}


const FeatureCard : React.FC<propsType> = ({id,img , name, price}) => {
    console.log(id);
    

// const {addToCart} = useCartContext ();


  const dispatch = useAppDispatch()

  return (
    <div className="border border-gray-200 hover:border-gray-300 hover:scale-105 transition-transform rounded-lg relative">
        <Link to={`/product/${id}`}>
        
        <img src={img} alt={name} />
        </Link>

        <div className="space-y-2 relative p-4 ">
            <div className="text-yellow-400 flex gap-[2px] text-[20px] ">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
            </div>
                <h3 className="font-medium">{name}</h3>
                <h3 className="text-2xl font-medium text-red-600">{price}</h3>
                <button className="absolute -top-4 right-2 bg-accent text-white text-[28px] w-[50px] h-[50px] rounded-full grid items-center  justify-center cursor-pointer" onClick={()=> dispatch(addToCart({id,img , name , price}))}>
                    <AiOutlineShopping />

                </button>

        </div>
    </div>
  )
}

export default FeatureCard