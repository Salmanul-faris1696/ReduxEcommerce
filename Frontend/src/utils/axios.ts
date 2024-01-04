import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:5000/api";
const token = Cookies.get('token');
console.log({token});

export const ApiClientPrivate = axios.create({
    baseURL: BASE_URL,
    headers:{
        
        Authorization: `Bearer ${token}`
    }
})