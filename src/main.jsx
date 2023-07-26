import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CompaniesProvider } from "./context/CompaniesProvider.jsx";
import { ProductProvider } from "./context/ProductProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <CompaniesProvider>
          <App />
        </CompaniesProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);
