/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    const Info = JSON.parse(localStorage.getItem("user-info"));
    if(Info){
      navigate('/data')
    }

    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save user info in localStorage
        localStorage.setItem("user-info", JSON.stringify(data));

        setMessage("Login successful. Redirecting...");
        setTimeout(() => navigate("/Data"), 2000);
      } else {
        setMessage( "Login failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 shadow-xl shadow-blue-500 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-white font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-transform duration-200 hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-red-500 font-medium">{message}</p>}

        {/* Divider */}
        <div className="my-4 border-t"></div>

        {/* Signup Link */}
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
