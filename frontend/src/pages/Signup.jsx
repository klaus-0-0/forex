import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import wave from "../assets/wave.svg";
import wave2 from "../assets/wave2.svg";
import config from '../config';

const Signup = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Info = JSON.parse(localStorage.getItem("user-info"));
  if(Info){
    navigate('/data')
  }

  // Google Signup
  const googleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log("Google Auth Code:", response.code);

        const res = await axios.post(`${config.apiUrl}/auth/google`, {
          code: response.code,
        });

        console.log("Google Signup Success:", res.data);
        localStorage.setItem("user-info", JSON.stringify(res.data));

        navigate("/data"); // Redirect after successful signup
      } catch (error) {
        console.error("Google Signup Error:", error);
      }
    },
    onError: (error) => console.error("Google Signup Failed", error),
    flow: "auth-code",
  });

  // Normal Signup
  const handleSignup = async () => {
    setSignupSuccess(true); // Start Animation

    try {
      const userData = await axios.post(`${config.apiUrl}/api/register`, {
        username,
        email,
        password,
      });

      localStorage.setItem("user-info", JSON.stringify(userData.data));
      setTimeout(() => {
        navigate("/data"); // Redirect after success
      }, 1500);
    } catch (error) {
      console.error("Signup Failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Background Waves */}
      <img src={wave} className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" alt="wave" />
      <img src={wave2} className="absolute bottom-0 left-0 w-full h-auto z-0 opacity-80" alt="wave2" />

      {/* Signup Box */}
      <div className="bg-white shadow-lg shadow-[#3f3429] rounded-lg w-[400px] min-h-[500px] relative z-10 flex flex-col justify-center px-10 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center z-20">Create an Account</h2>

        {/* Name */}
        <label className="text-gray-600 text-sm z-20">Name</label>
        <input
          type="text"
          className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <label className="text-gray-600 text-sm z-20">E-mail</label>
        <input
          type="email"
          className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="text-gray-600 text-sm z-20">Password</label>
        <input
          type="password"
          className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Signup Button with Melting Effect */}
        <div className="flex justify-center">
          <motion.button
            className="bg-[#8C6239] text-white w-14 h-14 rounded-full flex items-center justify-center mt-4 text-lg font-semibold transition-transform duration-200 hover:scale-110"
            onClick={handleSignup}
            animate={
              signupSuccess
                ? { scale: [1, 1.2, 0.8, 0.6, 0], opacity: [1, 0.9, 0.5, 0.2, 0] }
                : {}
            }
            transition={{ duration: 1.2 }}
          >
            {signupSuccess ? "" : "Go"}
          </motion.button>
        </div>

        {/* Google Signup Button */}
        <div className="flex justify-center mt-6">
          <motion.button
            className="bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition duration-200"
            onClick={googleSignup}
            whileHover={{ scale: 1.05 }}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-6 h-6" />
            <span>Sign up with Google</span>
          </motion.button>
        </div>

        {/* Redirect to Login Page */}
        <p className="text-gray-600 text-sm mt-4 text-center z-20">
          Already have an account?{" "}
          <span className="text-[#8C6239] cursor-pointer" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;