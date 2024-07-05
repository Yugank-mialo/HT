import { useEffect, useState, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

// Example components for charts
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";


// Project-specific components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import BasicInfo from "layouts/pages/account/settings/components/BasicInfo";

const zoneOption = [
    { value: "", label: "Select camera" },
    { value: "1", label: "Reception" },
    { value: "2", label: "Hallway" },
    { value: "3", label: "LabArea" },
  ];

function ZoneMapping() {

    const [selectedZone, setSelectedZone] = useState("");

    const handleCameraChange = (selectedOption) => {
        setSelectedZone(selectedOption.label);
      };
  
    return (
        <DashboardLayout>
            <DashboardNavbar ShowOrHideTheSelectStoreInput={true} />
            <Grid item xs={12} my={10}>
                  <BasicInfo />
                </Grid>
        </DashboardLayout>
    );
}

export default ZoneMapping