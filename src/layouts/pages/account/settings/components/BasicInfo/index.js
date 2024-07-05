import { useState } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";

function BasicInfo() {
  const [skills, setSkills] = useState(["react", "angular"]);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <ArgonBox p={3}>
        <ArgonTypography variant="h5">Zone mapping</ArgonTypography>
      </ArgonBox>
      <ArgonBox component="form" pb={3} px={3}>
        <Grid container spacing={3} style={{ minHeight: "30vh" }}>
          <Grid item xs={12} sm={12}>
            <ArgonBox display="flex" flexDirection="column" height="100%">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
                mb={1}
              >
                I&apos;m
              </ArgonTypography>
              <ArgonSelect fullWidth placeholder="Male" options={selectData.gender} />
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
                Birth Date
              </ArgonTypography>
              <ArgonSelect
                    defaultValue={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "label two", label: "label two" },
                    ]}
                    options={[
                      { value: "choice 1", label: "Choice 1" },
                      { value: "choice 2", label: "Choice 2" },
                      { value: "choice 3", label: "Choice 3" },
                      { value: "choice 4", label: "Choice 4" },
                      { value: "label one", label: "Label One", isDisabled: true },
                      { value: "label two", label: "Tabel Two" },
                      { value: "label three", label: "Label Three" },
                    ]}
                    isMulti
                  />            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
    </Card>
  );
}

export default BasicInfo;
