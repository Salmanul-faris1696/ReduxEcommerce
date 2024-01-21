import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../public/Images/l2.jpg";
import "../App.css";
import { useMutation } from 'react-query';
import { loginUser } from '../utils/handleApi';
import Cookies from "js-cookie"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate()

  const loginMutation = useMutation((data: { username: string; password: string })  => loginUser(data.username, data.password), {
    onSuccess: (data:any) => {
      navigate("/")

      // Handle successful login (e.g., redirect)
      console.log('Login successful', {data});
      console.log(data.other);
      

      Cookies.set("token" , data.accessToken)
      Cookies.set("userID" , data.others._id);
       window.location.reload();
      
    },
    onError: (error: Error) => {
      console.error('Login error:', error.message);
       toast.warn("Unable to login. Please try again.", {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ username, password });
    } catch (error) {
      // Error will be handled by onError in useMutation
    }
  };


 

  return (
    <div className="relative h-screen bg-opacity-70 bg-login bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex h-full items-center justify-center ">
        <div className="border  border-red-400 shadow-xl shadow-zinc-500 bg-gray-300 opacity-90 rounded-md p-2 md:w-[800px] md:h-[500px]   w-[500px] h-[500px] ">
          <div className="flex items-center justify-center gap-2 p-1">
            <div className="w-1/2 opacity-70 rounded-md z-20">
              <img src={loginImage} alt="" className="w-[300px] h-[300px] md:h-[370px] md:w-full rounded-md relative"  />
                {/* <div className="absolute max-w-[470px] sm:ml-16 ml-8 left-[23%] top-[25%] -translate-y-[50%] sm:space-y-4">
                    <p className="text-2xl hidden md:hidden lg:block   font-bold text-black text-center">Discover a world of flavors <br /> at your fingertips.</p>
                    </div> */}
            </div>
            <div className="w-1/2 opacity-70">
              <form className="flex flex-col max-w-md mx-auto h-[370px] p-6 " onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold font-serif mb-4 text-center">Login</h2>

                <div className="mb-4">
                  <label htmlFor="text" className="block text-black font-bold mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-black font-bold mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
                  >
                    Login
                  </button>
                </div>
                
                
              </form>
              <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark" />
            </div>
            
          </div>
          <div className=" text-center">
                  <p>
                    Don't have an account ?
                  </p>
                  <div>
                  <p>
                    Enter your personal deatils and Start journey with us 
                  </p>
                  <Link to={'/SignupForm'}>
                  <button className="rounded-xl  bg-red-600 py-2 px-4 mt-2 text-white  hover:bg-red-700">
                    sign-up
                  </button>
                  
                  </Link>

                  </div>

                </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default Login;
