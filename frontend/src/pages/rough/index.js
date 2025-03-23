require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const prisma = new PrismaClient();
const app = express(); 
const PORT = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); 
app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize()); 
app.use(passport.session());

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({ where: { email: profile.emails[0].value } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: profile.displayName,
              email: profile.emails[0].value,
            },
          });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        done(null, { user, token });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.redirect(`http://localhost:5173/register?token=${req.user.token}`);
  }
);

app.get("/auth/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send("User not authenticated");
  }
});




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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});








