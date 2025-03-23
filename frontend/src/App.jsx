import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import FetchData from "./pages/FetchData";
import Login from "./pages/Login";
import Data from "./pages/Data";
import Register from "./pages/Register";
import Signup from "./pages/Signup";

function App() {
  const [economicData, setEconomicData] = useState(null); // ✅ Lift state up

  return (
    <Router>
      <FetchData setEconomicData={setEconomicData} /> {/* ✅ FetchData updates state */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/data" element={<Data economicData={economicData} />} /> {/* ✅ Pass data as prop */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
