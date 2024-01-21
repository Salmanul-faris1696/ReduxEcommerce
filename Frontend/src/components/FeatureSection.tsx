import axios from "axios"
import { useQuery } from "react-query"
import feature1 from "../../public/Images/feature__1.webp"
import { BASE_URL } from "../utils/axios"
import FeatureCard from "./FeatureCard"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"
import 'swiper/css/autoplay'



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

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
  <div className="mt-5 sm:col-span-2 md:col-span-3 lg:col-span-4">
    <Swiper
      slidesPerView={1}  
      breakpoints={{
        640: {
          slidesPerView: 2,  
        },
        768: {
          slidesPerView: 3, 
        },
        1024: {
          slidesPerView: 4,  
        },
      }}
      modules={[Autoplay]}
      autoplay={{ delay: 1000 }}
      loop={true}
      speed={3000}
      
      className="mySwiper "
    >
      {data.map((item: any) => (
        <SwiperSlide key={item._id}>
          <FeatureCard
            id={item._id}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  
</div>





    </div>
  )
}

export default FeatureSection