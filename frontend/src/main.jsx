import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Correct import
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import './index.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;  // ✅ Ensure it reads from .env

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
