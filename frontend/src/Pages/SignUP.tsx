import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
// import axios from 'axios';


const SignUP = () => {

  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [isLoading, setIsloading]=useState(false);
  const [isError, setIsError]=useState(false);
  const [errorMessage, setErrorMsg]=useState("");
  const navigate = useNavigate();


  async function handleSignup() {
    try {
      setIsloading(true);
      setIsError(false);
      const response = await axiosInstance.post('/auth/signup', {
        username:username,
        password:password
      });

      console.log(response.data);
      setIsloading(false);
      navigate("/signin");
      
    } catch (error:any) {
      setIsloading(false);
      setIsError(true);
      setErrorMsg(error.response?.data?.message || "An unexpexted error occured!");
      
      setTimeout(()=> {
        setIsError(false);
        setErrorMsg("");
      },4000);

      // if (axiosInstance.isAxiosError(error)) {
      //   setErrorMsg((error as any).response?.data?.message);
      // } else {
      //   setErrorMsg("An unexpected error occurred");
      // }
      // isAxiosError checks if the error object has Axios-specific prop'
      // error.response - error.request - error.config
    }
  }

  return (
    <div className="flex justify-center inset-0 items-center h-screen bg-gradient-to-tl from-[#abb0f6] to-[#39306e]">
      <div className='flex flex-col text-center mt-[-100px] mx-10'>
        <p className='text-white sm:text-5xl  text-3xl font-bold mb-4'>Welcome to <span className='text-[#251f47]'>Second Brain</span></p>
        <p className='text-white text-lg mb-6'>No more lost links. 
        <br/>Your personal hub for storing 
        <br/>YouTube videos and tweets—effortlessly!</p> 
      <div className="bg-[white] rounded-xl p-8 inline-block mx-auto">
        <div className="flex flex-col gap-4 items-center">
            <p className='text-2xl font-bold'>Sign UP</p>
          <input
            type="text"
            placeholder="username"
            onChange={(e)=> setUsername(e.target.value)}
            className="px-2 py-1 outline-0 rounded-lg bg-[#cbcffa]"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e)=> setPassword(e.target.value)}
            className="px-2 py-1 outline-0 rounded-lg bg-[#cbcffa]"
          />
          
          <button 
          onClick={handleSignup}
            className="px-18 bg-[#796ee6] py-1 text-white rounded-lg font-bold cursor-pointer transition-transform duration-300  ">
            {isLoading ? 'Loading':"Submit"}
          </button>

          {isError && <div className='text-red-500 text-sm mt-2 '>{errorMessage}</div> }
          <p>Already have an account? <Link to="/signin" className='text-[#48399a]'>Sing In</Link></p>
        </div>
      </div>

      </div>
      
    </div>
  );
};

export default SignUP;
