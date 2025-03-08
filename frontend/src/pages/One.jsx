import { useState, useEffect } from 'react';
import fetchData from './fetchData';

const headers = ["Nonfarm Productivity QoQ", "cpi", "ppi", "bank rates", "employment", "Event 6", "Event 7"];
const topCountries = [
  { name: 'United States', code: 'us' },
  { name: 'China', code: 'cn' },
  { name: 'Germany', code: 'de' },
  { name: 'Japan', code: 'jp' },
  { name: 'India', code: 'in' }
];

function One() {
  const [data, setData] = useState({
    "United States": Array(7).fill({}),
    "China": Array(7).fill({}),
    "Germany": Array(7).fill({}),
    "Japan": Array(7).fill({}),
    "India": Array(7).fill({})
  });

  useEffect(() => {
    const fetchDataForAllCountries = async () => {
      const fromDate = '2024-11-03';
      const toDate = '2024-11-11';

      const allDataPromises = topCountries.map(country =>
        fetchData(country.code, fromDate, toDate)
      );

      const allData = await Promise.all(allDataPromises);  // will wait till all and every single data line data fetched without error single error it wont work 

      const newData = topCountries.reduce((accumulator, currentValue_country, index) => { //currentValue is just iterating over the value
        accumulator[currentValue_country.name] = Array(7).fill({}).map((_, i) => allData[index][i] ? allData[index][i] : {}); // Ensure 7 elements for each country
        return accumulator;
      }, {
        "United States": Array(7).fill({}),
        "China": Array(7).fill({}),
        "Germany": Array(7).fill({}),
        "Japan": Array(7).fill({}),
        "India": Array(7).fill({})
      });

      console.log("New Data:", newData); // Debugging log

      setData(prevData => ({
        ...prevData,            // so prevdata and newdata if key element matched that newdata element data will be overwriten to prevdata
        ...newData              
      }));
    };

    fetchDataForAllCountries();
  }, [setData]);

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Title of the page */}
      <h1 className="text-2xl font-bold text-center mb-4">Top 5 Economies</h1>
      
      {/* Container for headers */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3"></div>
        <div className="col-span-9 p-2 grid grid-cols-7 gap-4">
          {/* Mapping through headers array to display each header */}
          {headers.map((header, index) => (
            <span key={index} className="text-center font-bold text-lg">{header}</span>
          ))}
        </div>
      </div>
      
      {/* Container for country names and corresponding data outputs */}
      {topCountries.map((country, countryIndex) => (
        <div key={countryIndex} className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <div className="p-2 border-b border-gray-600">
              <h2 className="text-xl font-bold">{country.name}</h2>
            </div>
          </div>
          <div className="col-span-9 grid grid-cols-7 gap-4">
            {data[country.name].map((val, index) => (
              <div key={index} className="border p-2 border-gray-600 bg-black text-white w-full text-center">
                {val && (
                  <div>
                    <p><strong>Actual:</strong> {val.actual || ''}</p>
                    <p><strong>Forecast:</strong> {val.forecast || ''}</p>
                    <p><strong>Previous:</strong> {val.previous || ''}</p>
                    <p><strong>Comment:</strong> {val.comment || ''}</p>
                    <p><strong>Country:</strong> {val.country || ''}</p>
                    <p><strong>Source:</strong> {val.source || ''}</p>
                    <p><strong>Period:</strong> {val.period || ''}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default One;
