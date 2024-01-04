import { TfiMenuAlt } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import CartCountBadge from "./CartCountBadge";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"




const MobileNav = ({setShowCart}:any) => {

    const [showSearchBar, setShowSearchBar] = useState(false);
     const [showUserOptions, setShowUserOptions] = useState(false);
      const navigate = useNavigate();

      const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

   const handleLogout = () => {
  
     Cookies.remove('token');
    navigate('/Login'); 
  };


  const toggleSearchBar = () => {
    setShowSearchBar(prevState => !prevState);
  };
  return (
    <div className="sticky top-0 bg-white z-10 shadow-md">
        <div className="container p-8 lg:hidden">
            <div className="flex  justify-between items-center">
                <div className="flex items-center gap-6">
                    <TfiMenuAlt  size={20}/>
                     <IoIosSearch size={24} onClick={toggleSearchBar} />
                      {showSearchBar && <SearchBar />}
                </div>

                <h1 className="text-lg font-medium">
                    logo 
                </h1>
                <div className=" flex gap-4 text-[30px]" onClick={toggleUserOptions}>
                    <FaUser size={20} />
                     {showUserOptions && (
              <div className="absolute right-24 mt-2 w-fit  bg-white border border-gray-300 rounded shadow-md">
                <ul>
                  <li className=" py-2 px-2 text-base cursor-pointer hover:bg-gray-500" onClick={handleLogout}>
                    Log Out
                  </li>
                  
                </ul>
              </div>
            )}
                    <div className="relative cursor-pointer" onClick={()=> setShowCart(true)}>
                         <MdShoppingCart size={24} />
                         <CartCountBadge size="w-[18px] h-[18px]"/>
                    </div>
                </div>   
            </div>
        </div>
    </div>
  )
}

export default MobileNav