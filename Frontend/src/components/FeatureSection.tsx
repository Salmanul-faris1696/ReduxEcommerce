import axios from "axios"
import { useQuery } from "react-query"
import feature1 from "../../public/Images/feature__1.webp"
import { BASE_URL } from "../utils/axios"
import FeatureCard from "./FeatureCard"
import { Swiper, SwiperSlide } from "swiper/react";




const FeatureSection = () => {

    const { data  , isLoading , isError} = useQuery('featureData', async()=>{
        const response = await axios.get(`${BASE_URL}/products`)
        return response.data;
    })   
    if(isLoading){
        return <div>
            Loading...
        </div>
    } {}

    console.log({data});
    

    // useEffect(()=>{

    // },[])
  return (
    <div className="container pt-16">
        <div className="lg:flex justify-between items-center " >
            <div>
                <h3 className="font-medium text-2xl "> Fruit & vegetable </h3>
                <p className="text-gray-600 mt-2 "> buy farm fruite and vegetable online at the best price</p> 
            </div>

            <div className="space-x-4 mt-8 lg:mt-0">
                <button className="feature_btn">Fruit</button>
                <button className="text-gray-600 hover:text-accent"> Vegetable </button>
                <button className="text-gray-600 hover:text-accent"> Bread & Bakery</button>

            </div>

        </div>

        <div className="grid grid-cols-4 ">
            <div className="">
                <img src={feature1} alt="banner" className=" h-full object-cover" />
            </div>

<div className="col-span-3 w-full h-full">

            <Swiper  slidesPerView={3} autoplay={{ delay: 3000 }}  className="mySwiper">

                {data.map((item:any) => (
        <SwiperSlide key={item._id}>
               
                <FeatureCard
                id={item._id}
                image={item.image}
                title={item.title}
                price={item.price}/>
        </SwiperSlide>
                
                ))
                }

        
      </Swiper>
</div>

            



           

        </div>




    </div>
  )
}

export default FeatureSection