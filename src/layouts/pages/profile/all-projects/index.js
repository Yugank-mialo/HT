import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Example components for charts
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import PieChart from "examples/Charts/PieChart";

// Project-specific components
import Header from "layouts/pages/profile/components/Header";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { API_Url } from "utils/API";

function AllProjects() {
  const [visitorData, setVisitorData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [demographicsData, setDemographicsData] = useState(null);
  const [firstEntryTime, setFirstEntryTime] = useState("");
  const [lastExitTime, setLastExitTime] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [entryCount, setEntryCount] = useState(0);
  const [exitCount, setExitCount] = useState(0);
  const [totalOccupied, setTotalOccupied] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_Url}/count_per_zone?store_id=1&from_date=2024-06-01&to_date=2024-06-30`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVisitorData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_Url}/hourly_footfall?store_id=1&date=2024-06-01`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHourlyData(data.Data);
        setFirstEntryTime(data.first_entry_time);
        setLastExitTime(data.last_exit_time);
        setTotalCount(data.total_count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const response = await fetch(
          `${API_Url}/demographics?store_id=1&from_date=2024-06-01&to_date=2024-06-30`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDemographicsData(data.Data);
      } catch (error) {
        console.error("Error fetching demographics data:", error);
      }
    };

    fetchDemographics();
  }, []);

  useEffect(() => {
    const fetchTotalFootfall = async () => {
      try {
        const response = await fetch(
          `${API_Url}/total_footfall?store_id=1&from_date=2024-06-01&to_date=2024-06-30`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEntryCount(data.entry_count);
        setExitCount(data.exit_count);
        setTotalOccupied(data.total_occupied);
      } catch (error) {
        console.error("Error fetching total footfall data:", error);
      }
    };

    fetchTotalFootfall();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            <VerticalBarChart
              title="Visitor Count per zone"
              chart={{
                labels: Object.keys(visitorData || {}).map((key) => key),
                datasets: [
                  {
                    label: "Entry",
                    color: "info",
                    data: Object.values(visitorData || {}).map((item) => item.entry),
                  },
                  {
                    label: "Exit",
                    color: "dark",
                    data: Object.values(visitorData || {}).map((item) => item.exit),
                  },
                ],
              }}
            />
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            {hourlyData && (
              <DefaultLineChart
                title="Hourly distribution of visitors across different zones"
                chart={{
                  labels: Array.from(Array(24).keys()).map((hour) => `${hour}:00`),
                  datasets: Object.keys(hourlyData).map((zone, index) => ({
                    label: zone,
                    // color: generateUniqueColors(Object.keys(hourlyData).length)[index],
                    data: Object.values(hourlyData[zone]),
                  })),
                }}
              />
            )}
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            {demographicsData && (
              <PieChart
                title="Distribution of visitors by age group"
                chart={{
                  labels: Object.keys(demographicsData.age).map((ageGroup) => ageGroup),
                  datasets: {
                    label: "Age Groups",
                    backgroundColors: ["info", "primary", "dark", "secondary", "warning", "success", "info", "dark"],
                    data: Object.values(demographicsData.age).map((item) => item.total),
                  }}
                }
              />
            )}
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
              <ArgonTypography variant="h3" color="black" px={5} py={3}>
                Entry Count: {entryCount}
              </ArgonTypography>
              <ArgonTypography variant="h3" color="black" px={5} py={3}>
                Exit Count: {exitCount}
              </ArgonTypography>
              <ArgonTypography variant="h3" color="black" px={5} py={3}>
                Total Occupied: {totalOccupied}
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
  );
}

export default AllProjects;
