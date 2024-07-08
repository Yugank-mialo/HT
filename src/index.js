import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Changed to HashRouter
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";

import "./style.css";
import { StoreProvider } from "globalContext/GlobalContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StoreProvider>
    <HashRouter>
      <ToastContainer />
      <ArgonControllerProvider>
        <PerfectScrollbar>
          <App />
        </PerfectScrollbar>
      </ArgonControllerProvider>
    </HashRouter>
  </StoreProvider>
);
