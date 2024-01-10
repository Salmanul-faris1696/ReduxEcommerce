import hero1 from "../../public/Images/hero1.webp"
import { FaArrowRight } from "react-icons/fa6";
import hero2 from "../../public/Images/hero__2.webp"
import hero3 from "../../public/Images/hero__3.webp"
import { Link } from 'react-router-dom';



const Hero = () => {
  return (
    <div className="container mt-3">
        <div className="grid xl:grid-cols-3 xl:grid-rows-2 gap-8">
            <div className="xl:col-span-2 xl:row-start-1 xl:row-end-[-1] relative hover:scale-95 duration-500">
                <img src={hero1} alt=" hero first image" className="w-full h-full object-cover rounded-lg "/>
                <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-4">
                    <p className="text-2xl hidden sm:block ">100% Orginal Dry fruit</p>
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold">DIRED FRUIT BEST HEALTHY</h2>
                    <p className="text-gray-500 text-xl pt-4 sm:pt-8">Starting At</p>
                    <div className="font-medium text-red-600 text-2xl sm:text-4xl  pb-4 sm:pb-8 ">$18.36</div>
                      <Link to= {'/Items'}>
                    <div className="bg-accentDark hover:bg-accent text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3  cursor-pointer hover:scale-105 duration-300 ">

                        Shop Now <FaArrowRight />
                    </div>
                      </Link>
                </div>
            </div> 

            <div className="relative hover:scale-95 duration-500">
                <img src={hero2} alt="second image" className="h-full w-full object-cover round-lg " />
                <div className="absolute max-w-[470px] sm:ml-16 ml-8  top-[50%] -translate-y-[50%] sm:space-x-2">
                    <h2 className="text-2xl sm:text-3xl font-bold">Best Yummy piza</h2>
                    <p className="text-gray-500 text-xl pt-4">Starting At</p>
                    <div className="font-medium text-red-600 text-2xl sm:text-4xl pb-8">$25</div>
                    <div className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3  cursor-pointer hover:scale-105 duration-300 ">
                        Shop Now <FaArrowRight/>

                    </div>
                </div>
            </div>

              <div className="relative hover:scale-95 duration-500">
                <img src={hero3} alt="second image" className="h-full w-full object-cover round-lg " />
                <div className="absolute max-w-[470px] sm:ml-16 ml-8  top-[50%] -translate-y-[50%] sm:space-x-2">
                    <h2 className="text-2xl sm:text-3xl font-bold">Best Yummy chips</h2>
                    <p className="text-gray-500 text-xl pt-4">Starting At</p>
                    <div className="font-medium text-red-600 text-2xl sm:text-4xl pb-8">$10</div>
                    <div className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3  cursor-pointer hover:scale-105 duration-300 ">
                        Shop Now <FaArrowRight/>

                    </div>
                </div>
            </div>

        </div>


    </div>
  )
}

export default Hero