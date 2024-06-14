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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Button from "@mui/material/Button";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonDatePicker from "components/ArgonDatePicker";

// Argon Dashboard 2 PRO MUI example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Argon Dashboard 2 PRO MUI base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <ArgonBox position="relative">
      {/* <DashboardNavbar absolute light /> */}
      {/* <ArgonBox height="220px" /> */}
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
        style={{ backgroundColor: "#9d2136" }}
      >
        <Grid container spacing={3} alignItems="center">
          {/* <Grid item>
            <ArgonAvatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid> */}
          <Grid item xs={12}>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <ArgonDatePicker input={{ placeholder: "To Date" }} />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ArgonDatePicker input={{ placeholder: "From Date" }} />
                </Grid>
                <Grid item container xs={12} md={6} justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="white">
                      Clear
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="white">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ArgonBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="App"
                  icon={
                    <i className="ni ni-app" style={{ marginTop: "6px", marginRight: "8px" }} />
                  }
                />
                <Tab
                  label="Message"
                  icon={
                    <i
                      className="ni ni-email-83"
                      style={{ marginTop: "6px", marginRight: "8px" }}
                    />
                  }
                />
                <Tab
                  label="Settings"
                  icon={
                    <i
                      className="ni ni-settings-gear-65"
                      style={{ marginTop: "6px", marginRight: "8px" }}
                    />
                  }
                />
              </Tabs>
            </AppBar>
          </Grid> */}
        </Grid>
      </Card>
    </ArgonBox>
  );
}

export default Header;
