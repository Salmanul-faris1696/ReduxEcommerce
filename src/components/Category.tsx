import CategoryData from "../data/datas.json"
import CategoryCard from "./CategoryCard"


const Category = () => {
  return (
    <div className="container pt-26">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                CategoryData.map((item) => (
                    <CategoryCard 
                    key={item.id} 
                    img={item.img}
                    name={item.name}
                    count={item.count}/>

                ))
            }


        </div>

    </div>
  )
}

export default Category