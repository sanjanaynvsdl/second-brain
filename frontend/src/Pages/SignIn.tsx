import { useState } from 'react';
import {Link} from 'react-router-dom';

const SignIn = () => {
  const[isLoading, setIsLoading]=useState(false);

  return (
    <div className="flex justify-center inset-0 items-center h-screen bg-gradient-to-tl from-[#abb0f6] to-[#3f347b]">
      <div className='flex flex-col text-center mt-[-100px]'>
        <p className='text-white text-3xl font-bold mb-4'>Welcome to <span className='text-[#251f47]'>second Brain</span></p>
        <p className='text-white mb-6 text-lg'>No more lost links. 
        <br/>Your personal hub for storing 
        <br/>YouTube videos and tweets—effortlessly!</p>
      <div className="bg-white rounded-xl p-8 flex flex-col">
        <div className="flex flex-col gap-4 items-center">
            <p className='text-2xl font-bold'>Sign In</p>
          <input
            type="text"
            placeholder="username"
            className="px-2 py-1 outline-0 rounded-lg bg-[#e2e5fd]"
          />
          <input
            type="password"
            placeholder="password"
            className="px-2 py-1 outline-0 rounded-lg bg-[#e2e5fd]"
          />

          
          <button 
          //todo: Add a proper loader
            className= {`${isLoading ? `px-18 bg-[#51469e] py-1 text-white rounded-lg font-bold`:`px-18 bg-[#796ee6] py-1 text-white rounded-lg font-bold`}`}>
            Submit
          </button>
          <p>Don't have an account? <Link to="/signup" className='text-[#48399a]'>Sing Up</Link></p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
