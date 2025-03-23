import { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import config from "../config";

const FetchData = ({ setEconomicData }) => {
  useEffect(() => {
    const fetchEconomicData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/economic-data`);
        console.log("Fetched Economic Data:", response.data);
        setEconomicData(response.data);  // ✅ Update state in parent
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEconomicData();
  }, []);

  return null; // No need to render anything
};

FetchData.propTypes = {
  setEconomicData: PropTypes.func.isRequired,
};

export default FetchData;
