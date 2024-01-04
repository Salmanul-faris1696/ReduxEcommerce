import React, { ChangeEvent, FormEvent, useState } from 'react';
import "../App.css";

import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../utils/handleApi';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const navigate = useNavigate();
  const signupMutation = useMutation((data : {username : string ; email :string ; password : string }) => signupUser(data.username , data.email , data.password),{
    onSuccess : (data :any)=>{

      console.log('signup successfully ' ,{data});
      navigate('/Login')

    },
    onError:(error : Error) => {
      console.log("signup error" , error.message)
    } 

  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     try {
      await signupMutation.mutateAsync({ username, email, password });
    } catch (error) {
      // Error will be handled by onError in useMutation
    }
  };

  return (
  
  <div className=' realative h-screen bg-opacity-70 bg-login bg-cover bg-center'>
  

    <form className=" absolute w-[450px] md:w-[600px] top-[20%] ml-6 md:ml-24 lg:ml-[30%]  p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600 mb-1">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
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
        <Link to={"/Login"}>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600" onClick={handleSubmit}
        >
          Sign Up
        </button>

        </Link>
      </div>
    </form>
   

  </div>
  );
};

export default SignupForm;
