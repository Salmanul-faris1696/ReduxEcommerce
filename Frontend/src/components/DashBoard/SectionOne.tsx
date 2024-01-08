import { FaUserFriends } from "react-icons/fa"
import { FaSitemap } from "react-icons/fa6"
import { MdOutlineFastfood } from "react-icons/md"
import user from "../../../public/Images/users.png"
import product from "../../../public/Images/product.png"
import add from "../../../public/Images/create.png"
import { useNavigate } from "react-router-dom"

const SectionOne = () => {

  const navigate = useNavigate();
  const handleProductTable = () =>{
    navigate('/ProductTable')
  } 

  const handleUserTable = ()=>{
    navigate('/UserTable')

  }

  const handleAddProduct = () =>{
    navigate('/CreateProduct')
  }
const cardItem=[
        {
            id:1,
            icon:<FaUserFriends size={30}/>,
            textRight:"users table",
            style:"bg-gradient-to-tr from-blue-600 to-blue-400  shadow-blue-500/40",
            image:user,
            onClick:handleUserTable

        },

        {
            id:2,
            icon:<FaSitemap size={30}/>,
            textRight:"Product table",
            style:'bg-gradient-to-tr from-pink-600 to-pink-400  shadow-pink-500/40',
            image:product,
            onClick:handleProductTable
        },

        {
            id:3,
            icon:<MdOutlineFastfood size={30}/>,
            textRight:"Create product",
            style:'bg-gradient-to-tr from-green-600 to-green-400  shadow-green-500/40',
            image:add,
            onClick:handleAddProduct
        }
]

  return (
    <div>
         <div className="mt-12  m-5   ">
           <div className="mb-12 grid gap-y-10 gap-x-10  md:grid-cols-2   lg:grid-col-4  xl:grid-col-4 xl:flex   ">

            {cardItem.map(({id,icon,textRight,style,image,onClick}:any) =>(
              <div key={id} className="raltive flex flex-col bg-clip-border border-2 rounded-xl bg-white text-gray-700 shadow-md w-[600px] h-[200px] hover:scale-95 duration-300" onClick={onClick} >
                <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden  text-white shadow-lg absolute -mt-4 grid h-16 w-16 items-center justify-center ${style} `}>
                    <p>
                        {icon}
                    </p>
                </div>
                

                <div className='p-4 text-right '> 
                    <p className='block  text-sm leading-normal font-bold  text-blue-gray-600  '>
                        {textRight}
                    </p>
                </div>
                <div className="flex justify-center items-center h-full">
      <img src={image} alt="" className="w-[100px] h-[100px]" />
    </div>
            </div>
            ))}



        </div>
    </div>
    </div>
  )
}

export default SectionOne