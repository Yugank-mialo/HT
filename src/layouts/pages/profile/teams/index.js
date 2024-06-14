import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Header from "layouts/pages/profile/components/Header";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Card } from "@mui/material";
import DataTable from "examples/Tables/DataTable";

function Teams() {
  return (
    <>
      <DashboardLayout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <VerticalBarChart
                title="Vertical Bar Chart"
                chart={{
                  labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
                  datasets: [
                    {
                      label: "Sales by age",
                      color: "dark",
                      data: [15, 20, 12, 60, 20, 15],
                    },
                  ],
                }}
              />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <VerticalBarChart
                title="Vertical Bar Chart"
                chart={{
                  labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
                  datasets: [
                    {
                      label: "Sales by age",
                      color: "dark",
                      data: [15, 20, 12, 60, 20, 15],
                    },
                  ],
                }}
              />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <DefaultLineChart
                title="Single Line Chart"
                chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Organic Search",
                      color: "info",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }}
              />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <DefaultLineChart
                title="Multi Line Chart"
                chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Organic Search",
                      color: "info",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                    {
                      label: "Referral",
                      color: "dark",
                      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                    },
                    {
                      label: "Direct",
                      color: "primary",
                      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
                    },
                  ],
                }}
              />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={12}>
            <ArgonBox mb={12}>
              <DefaultLineChart
                title="Table Should be here"
                chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Organic Search",
                      color: "info",
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                    {
                      label: "Referral",
                      color: "dark",
                      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                    },
                    {
                      label: "Direct",
                      color: "primary",
                      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
                    },
                  ],
                }}
              />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Top Three Fastest and Slowest zones
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Least Busy zone(in terms of time/ no of customers)
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Total customers for that time range
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Busy Zone (in terms of time/ no of customers)
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
}

export default Teams;
