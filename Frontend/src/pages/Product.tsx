import { useState } from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { FaFacebook, FaHome, FaInstagram, FaShoppingBag, FaTwitter } from "react-icons/fa"
import { FiMinus, FiPlus } from "react-icons/fi"
import { MdShoppingCart } from "react-icons/md"
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import descover from "../../public/Images/discover.webp"
import mastercard from "../../public/Images/mastercard.webp"
import paypal from "../../public/Images/paypal.webp"
import visa from "../../public/Images/visa.webp"
import { addToCart } from '../Features/Cart/CartSlice'
import { useAppDispatch } from '../app/hooks'
import Cart from "../components/Cart"
import CartCountBadge from "../components/CartCountBadge"
import { ApiClientPrivate } from '../utils/axios'
import { productImgUrl } from '../utils/urls'
import Pay from './Pay'



const Product: React.FC = () => {
         const { id } = useParams();
         const [ showCart , setShowCart] =useState<any>(false);
         const [quantity , setQuantity] = useState<number>(1);

const { data : product , isLoading } = useQuery('product', async()=>{
        const response = await ApiClientPrivate.get(`/products/find/${id}`)
        return response.data;
    })  
         const toggleCart = () => {
         setShowCart((prevShowCart:boolean) => !prevShowCart);
         };


        const dispatch = useAppDispatch()

        const handleIncrement = () => {
            setQuantity(quantity + 1) ;
        }

        const handleDecrement = () => {
            if(quantity === 0) {
                setQuantity(0)
            }
            else{

                setQuantity(quantity - 1 );
            }
        }

   
    if(isLoading){
        return <div>Loading...</div>
    }
  

  return (

    <div className=''>
    <div className=" sticky top-0 bg-white z-10 shadow-md">
        
        <div className="container  lg:block">
            <div className=" flex justify-between items-center p-8">
                <h1 className=" text-4xl font-medium"> Product</h1>

             <div className="flex gap-4  ">

                <Link to={`/`}>

                    <div className="icon__wrapper">
                        <FaHome />
                    </div>
                </Link>
                

                      <div className="icon__wrapper relative cursor-pointer"  onClick={toggleCart}>
                        <MdShoppingCart  />
                        <CartCountBadge size="w-[25px] h-[25px]"/>
                    </div>

                    {
        showCart && 
        (
            <Cart showCart={showCart} setShowCart={setShowCart}/>
            
        
            ) 
      }
            </div>        
            </div>

        </div>
        
        
    </div>


    <div className="  m-3  md:flex md:gap-3 p-20" >
        <div className="p-2 mb-4 rounded-lg  shadow-lg md:w-[50%] ">
            {/* <img src={`${productImgUrl}/${image}`} alt="" /> */}
            <img src={`${productImgUrl}/${product.image}`} alt={product.title}/>
           
            
        </div>

        <div className="md:w-[50%] rounded-lg shadow-lg p-5">

             <div className="text-yellow-400 flex gap-[2px] text-[20px] mb-4">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
            </div>

            <div className="mb-4 font-bold text-3xl">
             {product.title}
            </div>

            <div className="mb-4 text-red-600 text-3xl">
                {product.price}
            </div>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi facilis cum ut vitae illum asperiores magnam, deleniti esse aliquid, corporis modi cumque libero quisquam, voluptates similique odit eos pariatur quo.
            </div>

            <div className="flex justify-center items-center mt-10  md:flex md:justify-start gap-4">
                 <div className="flex gap-5 bg-gray-900 w-fit  text-white p-2  rounded-lg items-center">
                    <div className="bg-blue-600 p-3 rounded-full w-10 h-10 flex items-center justify-center" onClick={handleIncrement}>
                        <FiPlus/>

                    </div>
                     <div>
                        {quantity}
                        
                    </div>
                     <div className="bg-red-600 p-3 rounded-full w-10 h-10 flex items-center justify-center " onClick={handleDecrement}>
                        <FiMinus/>
                        
                    </div>
                 </div>
                

                <div className='flex items-center justify-center bg-accent p-3 rounded-full text-white cursor-pointer 'onClick={()=> dispatch(addToCart({...product,qtty:quantity}))}>

                    <FaShoppingBag  size={25}/>
                    
                </div>


            </div>

            <hr className='m-3 hidden md:block'/>

            <div className='flex  mt-5  mb-8 -ml-8 justify-center  md:flex md:justify-start md:-ml-3'>
                 <div className="flex bg-accent   text-white p-2  rounded-lg items-center w-[300px] ml-4 justify-center cursor-pointer"                
    //               onClick={() => {
    //     handleBuyNow();
    // }}
    >
     
                    <Pay Product={product}  />

                 </div>

                  {/* <PaymentPrompt
                product={product}
                onConfirm={handlePaymentConfirm}
                onCancel={handlePaymentCancel}
                isOpen={showPaymentPrompt}
            /> */}


            </div>

              <hr className='m-3 hidden md:block'/>


              <div className='flex items-center  gap-3 text-xl m-2'>
                <h2 className='font-extralight'>
                    Share :
                </h2>

                <div className='flex items-center justify-center gap-5 '>
                    <FaFacebook/>
                    <FaTwitter/>
                    <FaInstagram/>

                </div>


              </div>

               <hr className='m-3 hidden md:block'/>


               <div>
                <h1 className='font-extrabold mb-5'>
                    Guaranteed Safe Checkout : 
                </h1>

                <div className='flex gap-3'>
                    <img src={descover} alt="" />
                      <img src={mastercard} alt="" />
                        <img src={paypal} alt="" />
                          <img src={visa} alt="" />
                </div>
               </div>

             
        </div>

       
    </div>

    </div>
  )
}

export default Product