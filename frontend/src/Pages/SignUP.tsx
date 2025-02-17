import {Link} from 'react-router-dom';

const SignUP = () => {
  return (
    <div className="flex justify-center inset-0 items-center h-screen bg-gradient-to-tl from-[#abb0f6] to-[#39306e]">
      <div className='flex flex-col text-center mt-[-100px]'>
        <p className='text-white text-3xl font-bold mb-4'>Welcome to <span className='text-[#251f47]'>second Brain</span></p>
        <p className='text-white text-lg mb-6'>No more lost links. 
        <br/>Your personal hub for storing 
        <br/>YouTube videos and tweets—effortlessly!</p>
      <div className="bg-[white] rounded-xl p-8 flex flex-col">
        <div className="flex flex-col gap-4 items-center">
            <p className='text-2xl font-bold'>Sign UP</p>
          <input
            type="text"
            placeholder="username"
            className="px-2 py-1 outline-0 rounded-lg bg-[#cbcffa]"
          />
          <input
            type="password"
            placeholder="password"
            className="px-2 py-1 outline-0 rounded-lg bg-[#cbcffa]"
          />
          <button 
            className="px-18 bg-[#796ee6] py-1 text-white rounded-lg font-bold  ">
            Submit
          </button>
          <p>Already have an account? <Link to="/signin" className='text-[#48399a]'>Sing In</Link></p>
        </div>
      </div>

      </div>
      
    </div>
  );
};

export default SignUP;
