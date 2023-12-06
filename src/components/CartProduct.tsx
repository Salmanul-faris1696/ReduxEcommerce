import { HiOutlineMinus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { decrementQuantity, removeFromCart, } from "../Features/Cart/CartSlice";
import { useAppDispatch } from "../app/hooks";
import featureData from "../data/feature.json";



interface propsType {
    id: number
   qtty: number
}

const CartProduct:React.FC<propsType> = ({id,qtty}) => {
    const prod = featureData.find(it => it.id == id)
    // console.log({prod});
    
    // console.log({id});
    
    const dispatch = useAppDispatch();

    const handleRemoveFromCart = () => {
    dispatch(removeFromCart(prod)); 
  };

const handleDecrementQuantity = () => {
    if (prod && qtty > 1){
        dispatch(decrementQuantity(prod));
    }
}

  return (
    <div className="flex justify-between items-center bg-slate-100 relative">
        <div>
        <div className="flex items-center gap-4">
            <img src={prod?.img} alt="" className="h-[100px] m-1" />
            <div className="flex gap-10">
                <h3 className="font-medium">{prod?.name}</h3>
                <p className="text-gray-600"> {prod?.price}</p>
            <RxCross1 onClick={handleRemoveFromCart} className="cursor-pointer absolute top-5 right-5 "/>
            
            </div>

        </div>

        <div className="flex  items-center justify-center gap-5 ml-14 mb-5">
            <div className="flex ">{qtty} </div>

            {qtty > 1 && (

                <button  onClick={handleDecrementQuantity} 

                // className="rounded-lg w-5 h-5 flex items-center justify-center bg-red-700 p-3 text-white  shadow-sm hover:scale-105 transition-transform  text-2xl shadow-blue-500"
                className="border  p-1 bg-red-700 rounded-md hover:scale-105 text-white"
                >

                    <HiOutlineMinus  />
                </button>
                
                )
            }
            
            
        </div>

    



        </div>

        <div>

        </div>

    </div>
  )
}

export default CartProduct