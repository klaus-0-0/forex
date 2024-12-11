import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/unemployment-latest'; // Pointing to your proxy server
const BASE_URL1 = 'http://localhost:3001/api/cpi';                // Pointing to your proxy server

const FetchData = () => {
  const [response1, setResponse1] = useState(null); // State to store unemployment data
  const [response2, setResponse2] = useState(null); // State to store CPI data

  // Fetch unemployment data
  const fetchData1 = async () => {
    try {
      const result1 = await axios.get(BASE_URL);
      setResponse1(result1.data); // Update state with new response data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData1();
  }, []); // Empty dependency array means this runs once after the initial render

  useEffect(() => {
    if (response1) {
      console.log('Fetched Latest Unemployment Data:', response1); // Log the data

      if (response1.Results && response1.Results.series) {
        const Unemployment = response1.Results.series.map(series => {
          const seriesId = series.seriesID;
          const year = series.data[0].year;
          const period = series.data[0].period;
          const value = series.data[0].value;
          const footnotes = series.data[0].footnotes.map(fn => fn.text).join(', ');
          
          console.log(Unemployment);
          console.log(`Series ID: ${seriesId}, Year: ${year}, Period: ${period}, Value: ${value}, Footnotes: ${footnotes}`);
        });
      } else {
        console.log('No unemployment data found');
      }
    }
  }, [response1]); // Re-run this effect whenever `response1` changes

  // Fetch CPI data
  const fetchData2 = async () => {
    try {
      const result2 = await axios.get(BASE_URL1);
      setResponse2(result2.data); // Update state with new response data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData2();
  }, []); // Empty dependency array means this runs once after the initial render

  useEffect(() => {
    if (response2) {
      console.log('Fetched Latest CPI Data:', response2); // Log the data

      if (response2.Results && response2.Results.series) {
        const CPI = response2.Results.series.map(series => {
          const seriesId = series.seriesID;
          const year = series.data[0].year;
          const period = series.data[0].period;
          const value = series.data[0].value;
          const footnotes = series.data[0].footnotes.map(fn => fn.text).join(', ');
          
          console.log(CPI);
          console.log(`Series ID: ${seriesId}, Year: ${year}, Period: ${period}, Value: ${value}, Footnotes: ${footnotes}`);
        });
      } else {
        console.log('No CPI data found');
      }
    }
  }, [response2]); // Re-run this effect whenever `response2` changes

  return (
    <div>
      <h1>Check the console for the latest data</h1>
    </div>
  );
};

export default FetchData;
