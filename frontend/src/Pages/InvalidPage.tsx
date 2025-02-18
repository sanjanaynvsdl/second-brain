import { Link } from "react-router-dom";

const InvalidPage = ()=>{
    return(
        <div className="flex flex-col gap-3 justify-center text-center  bg-gradient-to-tl from-[#abb0f6] to-[#3f347b]  h-screen">
            <span className="bg-white p-6 inline-block mx-auto rounded-xl shadow-2xs mt-[-100px]">

            <p className="text-xl font-bold">This is an invalid Page,</p>
            <p>Please go to <Link to="/" className="text-[#251f47] underline font-bold">Home</Link> to get yout content!</p>
            </span>
        </div>
    )
}

export default InvalidPage;