import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./redux/store/index.js";

axios.defaults.baseURL =
  import.meta.env.VITE_REACT_APP_URL_BACKEND || "http://localhost:3001/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
