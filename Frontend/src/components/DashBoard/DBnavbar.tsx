import { useEffect, useState } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaHome, FaUsers } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { IoMdNotifications } from "react-icons/io";
import { MdDashboard, MdOutlineFastfood, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import  Cookies  from 'js-cookie';

const DBnavbar = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen);
};

const closeDrawer = () => {
  setIsDrawerOpen(false);
};

useEffect(() => {
  const closeDrawerOnOutsideClick = (e:any) => {
    if (isDrawerOpen && !e.target.closest('.drawer')) {
      closeDrawer();
    }
  };

  document.addEventListener('mousedown', closeDrawerOnOutsideClick);

  return () => {
    document.removeEventListener('mousedown', closeDrawerOnOutsideClick);
  };
}, [isDrawerOpen]);

const navigate = useNavigate();

const handleHomeButton = () =>{
    navigate('/');

}
    const [showUserOptions, setShowUserOptions] = useState(false);

    const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

   const handleLogout = () => {
  
     Cookies.remove('token');
    navigate('/Login'); 
  };

   const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = () =>{
    navigate('/CreateProduct')
  }

  const handleProductTable = () =>{
    navigate('/ProductTable')
  } 


  



    
  return (
    <div className="sticky top-0 bg-white z-10 shadow-md">
        <div className="lg:block">
            <div className=" flex  justify-between items-center py-8">
                <div className="flex items-center  gap-12 px-12">

                <h1 className=" text-4xl font-medium"> DashBoard</h1>

                <div className="relative w-[700px] max-w-[300px]">
                    <SearchBar />
                </div>
                </div>
                <div className="flex items-center  gap-5 px-12">

                <div className=" icon__wrapper hover:scale-95 transition-transform " onClick={handleHomeButton}>
                    <FaHome  size={25}/>
                </div>
                <div className="icon__wrapper  hover:scale-95 transition-transform " onClick={toggleDrawer}>
                   <BiSolidFoodMenu  size={25}/>
                </div>

                                        {isDrawerOpen && (
                    <div className="drawer fixed top-4 right-7  h-fit w-[300px] bg-gradient-to-r from-slate-700 to-zinc-950 p-3 rounded-lg ">
                        <button onClick={toggleDrawer} className="close-btn absolute top-[5px] right-[10px] cursor-pointer border-none text-[16px] p-3 rounded-full h-8 w-8 flex items-center justify-center bg-gray-200 font-extrabold">
                      X
                        </button>

                        <div className="p-5 py-8  rounded-sm grid gap-y-5">

                       <div  className="bg-white  rounded-md p-3 shadow-md hover:scale-95 duration-200 flex gap-3 items-center text-lg font-serif font-bold  hover:bg-blue-600 hover:text-white">
                        <MdDashboard size={18} />
                        Dashboard
                       </div>
                       <div  className="bg-white  rounded-md p-3 shadow-md hover:scale-95 duration-200 flex gap-3 items-center text-lg font-serif font-bold hover:bg-blue-600 hover:text-white">
                        <FaUsers size={18}/>
                        User table 
                       </div>
                       <div  className="bg-white  rounded-md p-3 shadow-md hover:scale-95 duration-200 flex gap-3 items-center text-lg font-serif font-bold hover:bg-blue-600 hover:text-white" onClick={handleProductTable}>
                        <MdOutlineProductionQuantityLimits  size={18}/>
                        Product table 
                       </div>
                       <div  className="bg-white  rounded-md p-3 shadow-md hover:scale-95 duration-200 flex gap-3 items-center text-lg font-serif font-bold hover:bg-blue-600 hover:text-white">
                        <GrNotes size={18}/>
                        Bill details 
                       </div>
                        <div  className="bg-white  rounded-md p-3 shadow-md hover:scale-95 duration-200 flex gap-3 items-center text-lg font-serif font-bold hover:bg-blue-600 hover:text-white" onClick = {handleAddProduct} >
                        <MdOutlineFastfood size={18} />
                        Add new product
                       </div>
                       <div  className="bg-white  rounded-md p-3 shadow-md hover:scale-95 duration-200 flex gap-3 items-center text-lg font-serif font-bold hover:bg-blue-600 hover:text-white" >
                        <IoMdNotifications size={18}/>
                        Notifications
                       </div>
                       <div  className="bg-white  rounded-md p-3 shadow-md hover:scale-95 duration-200 flex gap-3 items-center text-lg font-serif font-bold hover:bg-blue-600 hover:text-white"onClick={handleLogout} ><TbLogout size={18} />

                       log-out 
                       </div>
                        </div>
                    </div>
                    )}


                <div className=" icon__wrapper hover:scale-95 transition-transform" onClick={toggleUserOptions}>
                   <RiAdminFill  size={25}/>
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


                
                <div className=" icon__wrapper hover:scale-95 transition-transform" onClick={showModal}>
                   <IoMdNotifications  size={25}/>

                   {/* <Modal  className="right-0" title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
                </div>
                </div>

                

               

            </div>

        </div>
        
    </div>
  )
}

export default DBnavbar