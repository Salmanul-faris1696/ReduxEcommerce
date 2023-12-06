import banner1 from "../../public/Images/banner__1.webp"
import banner2 from "../../public/Images/banner__2.webp"


const Banner = () => {
  return (
    <div className="container pt-16">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
            <div className="overflow-hidden rounded-lg">
                <img src={banner1} className="hover:scale-105 transition-transform" alt="first banner" />
            </div>

             <div className="overflow-hidden rounded-lg">
                <img src={banner2} className="hover:scale-105 transition-transform" alt="first banner" />
            </div>
        </div>

    </div>
  )
}

export default Banner