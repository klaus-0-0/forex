import React from "react";z
import wave from "../assets/wave.svg";
import wave2 from "../assets/wave2.svg";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Top Background Wave */}
      <img src={wave} className="absolute top-0 left-0 w-full h-auto z-0 opacity-100" alt="wave" />

      {/* Login Box */}
      <div className=" bg-gray-200 shadow-lg rounded-2xl overflow-hidden w-[400px] min-h-[450px] relative z-10 flex flex-col justify-center px-10 py-12  shadow-lg shadow-[#3f3429] rounded-lg">
              <img src={wave2} className="absolute bottom-0 left-0 w-full h-auto z-0 opacity-100" alt="wave2" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center z-20">Log into your account</h2>

        <label className="text-gray-600 text-sm z-20">E-mail</label>
        <input type="email" className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20" placeholder="Enter your email" />

        <label className="text-gray-600 text-sm z-20">Password</label>
        <input type="password" className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20" placeholder="Enter your password" />

        {/* Rounded Button */}
        <div className="flex justify-center z-20">
          <button className="bg-[#8C6239] text-white w-14 h-14 rounded-full flex items-center justify-center mt-4 text-lg font-semibold transition transition-transform duration-200 hover:scale-110">
            Go
          </button>
        </div>

        <p className="text-gray-600 text-sm mt-4 text-center z-20">
          Don't have an account? <span className="text-[#8C6239] cursor-pointer">Sign up</span>
        </p>
      </div>

      {/* Bottom Background Wave - Moved Outside */}
      {/* <img src={wave2} className="absolute bottom-0 left-0 w-full h-auto z-0 opacity-100" alt="wave" /> */}
    </div>
  );
};

export default Login;
