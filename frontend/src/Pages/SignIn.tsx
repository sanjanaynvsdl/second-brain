import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIserror] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignin() {
    try {
      setIsLoading(true);
      setIserror(false);
      const response = await axiosInstance.post("/auth/signin", {
        username: username,
        password: password,
      });

      // console.log(response.data);

      const recievedtoken = response.data.token;
      localStorage.setItem("token", recievedtoken);
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      setIsLoading(false);
      setIserror(true);
      setErrMsg(error.response?.data?.message);

      // console.log(`Error in signup functionanlity - ${error}`);
      setTimeout(() => {
        setIserror(false);
        setErrMsg("");
      }, 3000);
    }
  }

  return (
    <div className="flex justify-center inset-0 items-center h-screen bg-gradient-to-tl from-[#abb0f6] to-[#3f347b]">
      <div className="flex flex-col text-center mt-[-100px]">
        <p className="text-white text-3xl font-bold mb-4">
        Welcome Back to <span className="text-[#251f47]">Second Brain👀</span>
        </p>
        <p className="text-white mb-6 text-lg">
        Get back to your saved content effortlessly.
          <br />
          Sign in to access your YouTube videos and tweets in one place!
        </p>
        <div className="bg-white rounded-xl p-8  inline-block mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-2xl font-bold">Sign In</p>
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className="px-2 py-1 outline-0 rounded-lg bg-[#e2e5fd]"
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 py-1 outline-0 rounded-lg bg-[#e2e5fd]"
            />

            <button
              onClick={handleSignin}
              className="px-18 bg-[#51469e] py-1 text-white rounded-lg font-bold cursor-pointer transition-transform duration-300"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>

            {isError && <div className="text-sm text-red-500">{errMsg}</div>}

            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#48399a]">
                Sing Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
