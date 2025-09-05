import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      <Toaster richColors position="top-right" />
    </Provider>
  </React.StrictMode>
);
