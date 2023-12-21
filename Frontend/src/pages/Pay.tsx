import axios from "axios";
// import {url} from "../Features/Cart/CartSlice";
interface payProps {
  Product : string
}

const APIURL = "http://localhost:5000/api"

const Pay:React.FC<payProps>= ({Product}) => {
  const handleCheckout = () => {
    console.log(Product)
    axios.post(`${APIURL}/stripe/create-checkout-session`,Product).then((res) => {
      console.log(res.data);
      if(res.data.url){
        window.location.href = res.data.url 
      }
    }).catch(err => console.log(err))
  }

  return (
    <div>
      <button onClick={() => handleCheckout()}>
        pay
      </button>
    </div>
  )
}

export default Pay
