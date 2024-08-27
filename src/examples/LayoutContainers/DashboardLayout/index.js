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

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 PRO MUI context
import { useArgonController, setLayout } from "context";

function DashboardLayout({ bgColor, children, ...rest }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkMode } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  const background = darkMode && !bgColor ? "transparent" : bgColor;

  return (
    <ArgonBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <ArgonBox
        bgColor={"rgb(17, 205, 239)"}
        width="100vw"
        position="absolute"
        top={0}
        left={0}
        sx={{
          height: pathname.includes('/dashboard/home') || pathname.includes('/dashboard/track-path') ? "140px" : pathname.includes('/dashboard/report') ? "100px":"190px",
          ...(darkMode && { bgColor: ({ palette: { background } }) => background.default }),
          '@media (max-width: 768px)': {
            height: pathname.includes('/dashboard/home') || pathname.includes('/dashboard/track-path') || pathname.includes('/dashboard/report') ? "120px" : "160px",
          },
          '@media (max-width: 480px)': {
            height: pathname.includes('/dashboard/home') || pathname.includes('/dashboard/track-path') || pathname.includes('/dashboard/report') ? "190px" : "140px",
          },
        }}        {...rest}
      />
      {children}
    </ArgonBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
