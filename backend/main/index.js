require("dotenv").config();
const express = require("express");
const passport = require("passport");  
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const authRoutes = require("./authRoutes"); // Import auth routes

const prisma = new PrismaClient(); //  Initialize Prisma Client
const PORT = 3000;

const app = express();
app.use(express.json());

// **Enable CORS (Cross-Origin Resource Sharing)**
app.use(
  cors({
    origin: ["https://forex-frontend-ozhi.onrender.com"], // Allow frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

// **Initialize session for storing user login state**
app.use(
  session({
    secret: "secret",            // secret is a key and value is a random string to access cookie (google sends key convert into jwt and store in the local storage)
    resave: false,               // it stops resaving user data every time user logs in 
    saveUninitialized: true,     // if there is no session it will save an empty session whenever there is data it will save in that session
  })
);

app.use(passport.initialize());  // it initializes in your app so that you can authenticate user id
app.use(passport.session());     // it stores user id on the server so user doesn’t have to log in again and again 
app.use("/api", authRoutes); 

passport.use(
  new GoogleStrategy(            // creating a new Google strategy, it can be new Facebook strategy too
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://forex-frontend-ozhi.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //  Simply return user profile, no database interaction
        return done(null, profile);
      } catch (error) {
        console.error("OAuth Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));             // user id and user data are stored and verified in session temporarily.
passport.deserializeUser((user, done) => done(null, user));           // user id will retrieve all information of user like userid, email, username, profile picture

//  Centralized function for user creation or retrieval
const findOrCreateUser = async (userData) => {
  let user = await prisma.user.findUnique({ where: { email: userData.email } });

  if (!user) {
    //  If user doesn’t exist, create a new user in database
    user = await prisma.user.create({ data: userData });
    console.log("New user registered:", user);
  } else {
    console.log("Existing user found:", user);
  }

  return user;
};

//  API for Google Login from Frontend
app.post("/auth/google", async (req, res) => {
  try {
    const { code } = req.body; //  Get auth code from frontend

    if (!code) {
      return res.status(400).json({ error: "Authorization code is missing" });
    }

    //  Exchange code for access token from Google
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "https://forex-frontend-ozhi.onrender.com", // Must match redirect URI from frontend
      grant_type: "authorization_code",
      code, 
    });

    //  Fetch user profile from Google
    const { data: userInfo } = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: { Authorization: `Bearer ${data.access_token}` }, 
    });

    console.log("Google User Info:", userInfo);

    //  Check if user already exists in database, if not, create
    const userData = {
      username: userInfo.name,
      email: userInfo.email,
      profilePic: userInfo.picture, // Store profile picture
      password: null, // Google users don’t have passwords
    };
    const user = await findOrCreateUser(userData);

    //  Return user details to frontend
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.error("Google OAuth Error:", error.message);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// **Using Auth Routes for Other Auth Operations**


//  Economic Data Fetching
const FRED_API_KEY = process.env.FRED_API_KEY;

const fetchEconomicData = async (series_id) => {
  try {
    const response = await axios.get("https://api.stlouisfed.org/fred/series/observations", {
      params: {
        series_id,
        api_key: FRED_API_KEY,
        file_type: "json",
        sort_order: "desc",
        limit: 1,
      },
    });
    return response.data.observations[0] || null;
  } catch (error) {
    console.error(`Error fetching ${series_id}:`, error.message);
    return null;
  }
};

app.get("/api/economic-data", async (req, res) => {
  try {
    console.log("Fetching latest economic data...");

    const data = {
      country: "United States",
      unemployment: await fetchEconomicData("UNRATE"),  // Unemployment Rate
      cpi: await fetchEconomicData("CPIAUCSL"),         // Consumer Price Index
      gdp: await fetchEconomicData("GDP"),              // GDP
      ppi: await fetchEconomicData("PPIACO"),           // Producer Price Index
      employment: await fetchEconomicData("PAYEMS"),    // Total Employment
      bank_rates: await fetchEconomicData("DFF"),       // Bank Interest Rate (Federal Funds Rate)
      manufacturing: await fetchEconomicData("INDPRO"), // Manufacturing Production Index
      retail_sales: await fetchEconomicData("RSAFS"),   // Retail Sales
    };

    console.log("Latest Economic Data:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching economic data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
