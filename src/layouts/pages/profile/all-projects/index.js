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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { Card } from "@mui/material";
import PieChart from "examples/Charts/PieChart";

import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Project page components
import Header from "layouts/pages/profile/components/Header";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function AllProjects() {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
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
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <PieChart
                title="Pie Chart"
                chart={{
                  labels: ["Facebook", "Direct", "Organic", "Referral"],
                  datasets: {
                    label: "Projects",
                    backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
                    data: [15, 20, 12, 60],
                  },
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
          <Grid item xs={12} md={3}>
            <ArgonBox mb={3}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Total Footfall
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <ArgonBox mb={3}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Peak hour
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <ArgonBox mb={3}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Most popular zone
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <ArgonBox mb={3}>
              <Card style={{ minHeight: "300px" }}>
                <ArgonTypography variant="h2" color="black" px={5} py={9}>
                  Least popular zone
                </ArgonTypography>
              </Card>
            </ArgonBox>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
}

export default AllProjects;
