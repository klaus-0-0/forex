const express = require('express');
const axios = require('axios');
const cors = require('cors');

const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
  
const app = express();
const port = 3001; 
const API_KEY = 'e21c291b91c34cf49ed3946cfea39474'; // Your API key
const BASE_URL = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';

app.use(cors()); 
app.use(express.json());
 
// app.get('/api/unemployment-latest', async (req, res) => {
//   const seriesId = 'LNS14000000'; // Unemployment Rate
//   const params = {
//     seriesid: [seriesId],
//     registrationkey: API_KEY,
//   };

//   try {
//     const response = await axios.post(BASE_URL, params, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     console.log('Latest Unemployment Data:', response.data); // Log the data
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching latest unemployment data:', error.message);
//     res.status(500).json({ error: 'Error fetching data' });
//   }
// });

// app.get('/api/cpi', async (req, res) => {
//   const seriesId = 'CUSR0000SA0'; // CPI
//   const params = {
//     seriesid: [seriesId],
//     registrationkey: API_KEY,
//   };

//   try {
//     const response = await axios.post(BASE_URL, params, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     console.log('CPI:', response.data); // Log the data
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching CPI data:', error.message);
//     res.status(500).json({ error: 'Error fetching data' });
//   }
// });


app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
