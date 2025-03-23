import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const indicators = [
  "CPI", "PPI", "GDP", "Unemployment", "Employment",
  "Bank Rates", "Services", "Manufacturing", "Retail Sales"
];

const countries = ["USA", "CHINA", "GERMANY", "INDIA", "RUSSIA", "EUROPE", "UK"];

const generateRandomData = () => {
  return Array.from({ length: indicators.length }, () => Math.floor(Math.random() * 10) + 1);
};

const Data = ({ economicData }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Check if user is logged in
    const userInfo = JSON.parse(localStorage.getItem("user-info"));

    if (!userInfo) {
      navigate("/login"); // 🚀 Redirect to login if no user
    } else {
      setUser(userInfo);
    }
  }, [navigate]);

  // ✅ Handle Sign-Out
  const handleSignOut = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };

  let data = Array.from({ length: countries.length }, () => generateRandomData());

  // ✅ Use API data for USA and CHINA if available
  const updateCountryData = (countryIndex, countryName) => {
    if (economicData && economicData.country.toUpperCase() === countryName) {
      data[countryIndex] = [
        economicData.cpi?.value || "N/A",
        economicData.ppi?.value || "N/A",
        economicData.gdp?.value || "N/A",
        economicData.unemployment?.value || "N/A",
        economicData.employment?.value || "N/A",
        economicData.bank_rates?.value || "N/A",
        economicData.services?.value || "N/A",
        economicData.manufacturing?.value || "N/A",
        economicData.retail_sales?.value || "N/A",
      ];
    }
  };

  updateCountryData(0, "UNITED STATES");
  updateCountryData(1, "CHINA");

  if (!user) {
    return null; // Don't render anything until auth is checked
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 px-4">
      
      {/* ✅ Profile & Sign-Out Button */}
      <div className="w-full max-w-6xl flex justify-between items-center py-4">
        <h2 className="text-2xl text-white font-bold">Economic Data</h2>
        <div className="flex items-center gap-4">
          <img
            src={user.profilePic || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-400"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="w-full max-w-6xl overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <div className="border border-gray-700">
          <div className="grid grid-cols-10 min-w-[800px] text-center border border-gray-700">
            <div className="font-bold bg-gray-900 text-white p-2 border border-gray-700">
              Country
            </div>
            {indicators.map((item, index) => (
              <div key={index} className="bg-gray-700 text-white p-2 border border-gray-700 cursor-pointer hover:scale-105 transition-transform duration-200">
                {item}
              </div>
            ))}
          </div>

          {countries.map((country, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-10 min-w-[800px] text-center border border-gray-700">
              <div className="bg-gray-700 text-white font-bold p-2 border border-gray-700">
                {country}
              </div>
              {data[rowIndex].map((value, colIndex) => (
                <div key={colIndex} className="bg-blue-500 text-white p-2 border border-gray-700 cursor-pointer hover:scale-105 transition-transform duration-200">
                  {value}
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

// ✅ PropType validation
Data.propTypes = {
  economicData: PropTypes.shape({
    country: PropTypes.string,
    cpi: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    ppi: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    gdp: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    unemployment: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    employment: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    bank_rates: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    services: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    manufacturing: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
    retail_sales: PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
  }),
};

export default Data;
