import feature2 from "../../public/Images/feature__2.webp"
import FeatureCard from "./FeatureCard"
import feartureData from "../data/feature.json"


export const FeatureSection2 = () => {
  return (
    <div>
          <div className="container pt-16">
        <div className="lg:flex justify-between items-center " >
            <div>
                <h3 className="font-medium text-2xl ">Breakfast & Dairy </h3>
                <p className="text-gray-600 mt-2 ">Buy best quality breakfast online from big-basket stop near you</p> 
            </div>

            <div className="space-x-4 mt-8 lg:mt-0">
                <button className="feature_btn">Egg & Dairy </button>
                <button className="text-gray-600 hover:text-accent"> pizza </button>
                <button className="text-gray-600 hover:text-accent"> Snacks </button>

            </div>

        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
            <div>
                <img src={feature2} alt="banner" className="w-full h-full object-cover" />
            </div>

        {feartureData.map((item) => (
            <div key={item.id}>

           <FeatureCard
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}/>
        </div>
         )
         
         )}
        </div>




    </div>
    </div>
  )
}
