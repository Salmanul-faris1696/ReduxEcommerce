import axios from "axios"

const BASE_URL = "http://localhost:5000/api";

export const loginUser = async(username , password)=>{
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`,{username,password})
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "login failed")
    }

};

export const signupUser  = async(username,email, password)=>{
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`,{username ,email,password})
        return response.data;

    } catch (error) {
        throw new Error(error.resposnse?.data?.message || "sigup failed")
        
    }
}