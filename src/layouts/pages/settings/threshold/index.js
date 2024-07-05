import { useEffect, useState, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

// Example components for charts
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";


// Project-specific components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Reviews from "layouts/pages/users/reports/components/Reviews";


function Threshold() {

  
    return (
        <DashboardLayout>
            <DashboardNavbar ShowOrHideTheSelectStoreInput={true} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                <ArgonBox py={8}>
                <Reviews />
                </ArgonBox>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default Threshold