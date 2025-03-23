import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  //  Google Login Function
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log("Google Authorization Code:", response.code);

        //  Send Auth Code to Backend (POST request)
        const res = await axios.post(`${config.apiUrl}/auth/google`, {
          code: response.code,
        });
        console.log("response.code = ", response.code)


        console.log("Login Success:", res.data);

        //  Store user info
        localStorage.setItem("user-info", JSON.stringify(res.data));

        //  Redirect to Data page
        navigate("/data");
      } catch (error) {
        console.error("Login Error:", error);
        navigate("/")
      }
    },
    onError: (error) => console.error("Google Login Failed", error),
    flow: "auth-code",
  });


  //  Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(`${config.apiUrl}/api/register`, {
        username,
        email,
        password,
      });

      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/data"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering / email already exists");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800  shadow-xl shadow-blue-500 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        {/*  Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition transition-transform duration-200 hover:scale-110"
          >
            Sign Up
          </button>
        </form>

        {message && <p className="mt-4 text-center text-yellow-400">{message}</p>}

        {/*  Google Sign-In Button */}
        <button
          onClick={googleLogin}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition transition-transform duration-200 hover:scale-110"
        >
          Sign in with Google
        </button>
        
        <button
            type="submit" onClick={()=>{navigate('/Login')}}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition transition-transform duration-200 hover:scale-110"
          >
            Login 
          </button>
      </div>
    </div>
  );
};

export default Register;
