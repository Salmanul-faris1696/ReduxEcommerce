import { FaUser } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import CartCountBadge from "./CartCountBadge";
import Searchbar from "./SearchBar";


const Navbar = ({setShowCart}:any) => {
  return (
    <div className=" sticky top-0 bg-white z-10 shadow-md">
        <div className="container hidden lg:block">
            <div className=" flex justify-between items-center p-8">
                <h1 className=" text-4xl font-medium"> Logo</h1>
                <div className="relative w-full max-w-[500px]">
                    <Searchbar/>
                </div>

                <div className="flex gap-4 ">
                    <div className="icon__wrapper">
                        <FaUser />
                    </div>

                    <div className="icon__wrapper relative cursor-pointer" onClick={()=> setShowCart(true)}>
                        <MdShoppingCart  />
                        <CartCountBadge size="w-[25px] h-[25px]"/>
                    </div>
                </div>

            </div>

        </div>

    </div>
  )
}

export default Navbar