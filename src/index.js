/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import "./style.css"
import { StoreProvider } from "globalContext/GlobalContext";
const container = document.getElementById("root");
const root = createRoot(container);
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

root.render(
  <StoreProvider>
  <ToastContainer />
    <HashRouter>
      <ArgonControllerProvider>
        <PerfectScrollbar>
          <App />
        </PerfectScrollbar>
      </ArgonControllerProvider>
    </HashRouter>
  </StoreProvider>
)