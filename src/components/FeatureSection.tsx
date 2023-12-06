import feature1 from "../../public/Images/feature__1.webp"
import feartureData from "../data/feature.json"
import FeatureCard from "./FeatureCard"

const FeatureSection = () => {
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

        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
            <div>
                <img src={feature1} alt="banner" className="w-full h-full object-cover" />
            </div>

        {feartureData.map((item) => (
            <div
            key={item.id} 
            
            >

        <FeatureCard
        id={item.id}
         img={item.img}
         name={item.name}
         price={item.price}/>
         </div>
         ))
         }
        </div>




    </div>
  )
}

export default FeatureSection