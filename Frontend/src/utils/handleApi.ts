import axios from "axios"
import Product from '../pages/Product';
import { BASE_URL } from "./axios";



export const loginUser = async(username:string , password:string)=>{
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`,{username,password})
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "login failed")
    }

};

export const signupUser  = async(username :string,email :string, password :string)=>{
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`,{username ,email,password})
        return response.data;

    } catch (error:any) {
        throw new Error(error.resposnse?.data?.message || "sigup failed")
        
    }
}

export const createProductRequest = async(data: typeof Product) =>{
    try {
        const response = await axios.post(`${BASE_URL}/products`,data)
        return response.data
    } catch (error:any) {
          throw new Error(error.resposnse?.data?.message || "unable create products")
    }
}

export const fetchProductById = async (_id:any) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${_id}`); 
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product by ID');
  }
};