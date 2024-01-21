import Cookies from "js-cookie";
import { useState ,useEffect} from "react";
import { FaUser } from "react-icons/fa";
import { MdDashboardCustomize, MdShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import CartCountBadge from "./CartCountBadge";
import Searchbar from "./SearchBar";
import { axiosInstance } from './axios'; 


interface UserRoleResponse {
  role: string;
}

const Navbar = ({setShowCart}:any) => {
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [userRole, setUserRole] = useState('');
  const [isLoadingRole, setIsLoadingRole] = useState(false)
      const navigate = useNavigate();
 

  const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

   const handleLogout = () => {
  
     Cookies.remove('token');
    navigate('/Login'); 
  };

  const handleAdminPage= ()=>{
    navigate("/DashBoard");
  }
  

  

  return (
    <div className=" sticky top-0 bg-white z-10 shadow-md">
        <div className="container hidden lg:block">
            <div className=" flex justify-between items-center p-8">
                <h1 className=" text-4xl font-medium"> Logo</h1>
                <div className="relative w-full max-w-[500px]">
                    <Searchbar/>
                </div>

                

                <div className="flex gap-4 ">

                     <div className="icon__wrapper" onClick={handleAdminPage}>
                        <MdDashboardCustomize />
                    </div>


                    <div className="icon__wrapper" onClick={toggleUserOptions}>
                        <FaUser />
                    </div>

                     {showUserOptions && (
              <div className="absolute right-40 mt-2 w-72 bg-white border border-gray-300 rounded shadow-md">
                <ul>
                  <li className="py-2 px-4 cursor-pointer hover:bg-gray-500" onClick={handleLogout}>
                    Log Out
                  </li>
                  
                </ul>
              </div>
            )}

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