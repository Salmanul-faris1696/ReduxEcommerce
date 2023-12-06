import { MdLocalShipping } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoGiftSharp } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import FooterCard from "./FooterCard";


const FooterData = [ 
    {
        id:1,
        title : "free shipping" ,
        icon : <MdLocalShipping />
    },
    {
        id:2,
        title : "Best Price Guarantee",
        icon  : <GiTakeMyMoney />
    },
    {
        id:3,
        title : "Free Curbside Pickup",
        icon : <IoGiftSharp />
    },
    {
        id:4,
        title : "Support 24/7",
        icon : <MdOutlineSupportAgent />
    }
]

const Footer = () => {
  return (
    <div className="container pt-16">
        <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-4">
            {
                FooterData.map((item) => (
                  <FooterCard key={item.id}
                  title={item.title}
                  icon={item.icon}/>
                ))
            }
        </div>
        
    </div>
  )
}

export default Footer