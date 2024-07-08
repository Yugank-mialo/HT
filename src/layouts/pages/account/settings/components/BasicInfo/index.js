import { useState } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonButton from "components/ArgonButton";


// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";
 const ZonesList= [
  { value: "Zone1", label: "Zone1" },
  { value: "Zone2", label: "Zone2" },
];
function BasicInfo() {
  const [skills, setSkills] = useState(["react", "angular"]);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <ArgonBox p={3}>
        <ArgonTypography variant="h5">Zone mapping</ArgonTypography>
      </ArgonBox>
      <ArgonBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <ArgonBox display="flex" flexDirection="column" height="100%">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
                mb={1}
              >
              Zone
              </ArgonTypography>
              <ArgonSelect fullWidth placeholder="Select zone" options={ZonesList} defaultValue={ZonesList[0]} />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ArgonBox display="flex" flexDirection="column" height="100%">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
                mb={1}
              >
                Camera
              </ArgonTypography>
              <ArgonSelect
                defaultValue={[
                  { value: "Camera 1", label: "Camera 1" },
                  { value: "Camera 2", label: "Camera 2" },
                ]}
                options={[
                  { value: "Camera 1", label: "Camera 1" },
                  { value: "Camera 2", label: "Camera 2" },
                  { value: "Camera 3", label: "Camera 3" },
                  { value: "Camera 4", label: "Camera 4" },
                  { value: "Camera 5", label: "Camera 5" },
                  { value: "Camera 6", label: "Camera 6" },
                ]}
                isMulti
              />
            </ArgonBox>
          </Grid>
        </Grid>
        <ArgonBox display="flex" justifyContent="flex-end" mt={3}>
                  <ArgonBox mr={1} mt={2}>
                  </ArgonBox>
                  <ArgonButton variant="gradient" color="info">
                    Add
                  </ArgonButton>
                </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default BasicInfo;
