import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "tailwindcss/tailwind.css";

import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_REACT_APP_URL_BACKEND || "http://localhost:3001/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
