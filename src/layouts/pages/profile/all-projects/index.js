import { useEffect, useState, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import { Button, Card } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Example components for charts
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PieChart from "examples/Charts/PieChart";

// Project-specific components
import Header from "layouts/pages/profile/components/Header";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { API_Url } from "utils/API";
import { useStore } from "globalContext/GlobalContext";
import { useNavigate } from "react-router-dom";

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
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [submittedDates, setSubmittedDates] = useState({ fromDate: null, toDate: null });
  const { selectedStore, token } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Initial selected date

  const navigate = useNavigate();

  const authenticateTokenUI = localStorage.getItem("token") ? localStorage.getItem("token") : "";

  if (authenticateTokenUI === "") {
    navigate("/authentication/sign-in");
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleFromDateChange = (date) => {
    setFromDate(formatDate(date));
    if (toDate && date && date > toDate) {
      setToDate(null); // Reset toDate if it's before fromDate
    }
  };

  const handleToDateChange = (date) => {
    setToDate(formatDate(date));
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
    setSubmittedDates({ fromDate: null, toDate: null });
  };

  const handleSubmit = () => {
    if (fromDate && toDate) {
      setSubmittedDates({ fromDate, toDate });
    }
  };

  const formatDate = (date1) => {
    const date = new Date(date1);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchDataPerZone = async () => {
      try {
        let url = `${API_Url}/count_per_zone?store_id=${selectedStore}`;
        if (submittedDates.fromDate && submittedDates.toDate) {
          const formattedFromDate = formatDate(submittedDates.fromDate);
          const formattedToDate = formatDate(submittedDates.toDate);
          url += `&from_date=${formattedFromDate}&to_date=${formattedToDate}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVisitorData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData = async () => {
      try {
        let url = `${API_Url}/hourly_footfall?store_id=${selectedStore}&date=${selectedDate}`;
        const response = await fetch(url);
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
    const fetchDemographics = async () => {
      try {
        let url = `${API_Url}/demographics?store_id=${selectedStore}`;
        if (submittedDates.fromDate && submittedDates.toDate) {
          const formattedFromDate = formatDate(submittedDates.fromDate);
          const formattedToDate = formatDate(submittedDates.toDate);
          url += `&from_date=${formattedFromDate}&to_date=${formattedToDate}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDemographicsData(data.Data);
      } catch (error) {
        console.error("Error fetching demographics data:", error);
      }
    };
    const fetchTotalFootfall = async () => {
      try {
        let url = `${API_Url}/total_footfall?store_id=${selectedStore}`;
        if (submittedDates.fromDate && submittedDates.toDate) {
          const formattedFromDate = formatDate(submittedDates.fromDate);
          const formattedToDate = formatDate(submittedDates.toDate);
          url += `&from_date=${formattedFromDate}&to_date=${formattedToDate}`;
        }
        const response = await fetch(url);
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
    fetchDemographics();
    fetchData();
    fetchDataPerZone();
  }, [selectedStore, submittedDates, selectedDate]);

  useMemo(() => {
    console.log("Selected Store:", selectedStore);
  }, [selectedStore]);

  const clearToken = () => {
    localStorage.removeItem("token");
  };

  const handleLogout = () => {
    clearToken();
    navigate("/authentication/sign-in"); // Redirect to login page or any other page
  };

  const date = new Date(2024, 5, 26); // Year, month (0-indexed), day
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header
            fromDate={fromDate}
            toDate={toDate}
            handleFromDateChange={handleFromDateChange}
            handleToDateChange={handleToDateChange}
            handleClear={handleClear}
            handleSubmit={handleSubmit}
          />
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
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
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
                title="Distribution of male visitors by age group"
                chart={{
                  labels: Object.keys(demographicsData.age).map((ageGroup) => ageGroup),
                  datasets: {
                    label: "Age Groups",
                    backgroundColors: [
                      "info",
                      "primary",
                      "dark",
                      "secondary",
                      "warning",
                      "success",
                      "info",
                      "dark",
                    ],
                    data: Object.values(demographicsData.age).map((item) => item.male),
                  },
                }}
              />
            )}
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            {demographicsData && (
              <PieChart
                title="Distribution of female visitors by age group"
                chart={{
                  labels: Object.keys(demographicsData.age).map((ageGroup) => ageGroup),
                  datasets: {
                    label: "Age Groups",
                    backgroundColors: [
                      "info",
                      "primary",
                      "dark",
                      "secondary",
                      "warning",
                      "success",
                      "info",
                      "dark",
                    ],
                    data: Object.values(demographicsData.age).map((item) => item.female),
                  },
                }}
              />
            )}
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            {demographicsData && (
              <PieChart
                title="Distribution of total visitors by age group"
                chart={{
                  labels: Object.keys(demographicsData.age).map((ageGroup) => ageGroup),
                  datasets: {
                    label: "Age Groups",
                    backgroundColors: [
                      "info",
                      "primary",
                      "dark",
                      "secondary",
                      "warning",
                      "success",
                      "info",
                      "dark",
                    ],
                    data: Object.values(demographicsData.age).map((item) => item.total),
                  },
                }}
              />
            )}
          </ArgonBox>
        </Grid>

        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            <Card
              style={{
                minHeight: "380px",
                padding: "1rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  style={{ marginBottom: "1rem", textAlign: "left", color: "black" }}
                >
                  Total Footfall
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginBottom: "1rem", textAlign: "left", color: "black" }}
                >
                  Date: {formattedDate}
                </Typography>
                <Typography
                  variant="h4"
                  component="h3"
                  color="black"
                  gutterBottom
                  style={{ color: "black" }}
                  py={1}
                >
                  <span style={{ fontWeight: "bold" }}>Entry Count:</span> {entryCount}
                </Typography>
                <Typography
                  variant="h4"
                  component="h3"
                  color="black"
                  gutterBottom
                  style={{ color: "black" }}
                  py={1}
                >
                  <span style={{ fontWeight: "bold" }}>Exit Count:</span> {exitCount}
                </Typography>
                <Typography
                  variant="h4"
                  component="h3"
                  color="black"
                  gutterBottom
                  style={{ color: "black" }}
                  py={1}
                >
                  <span style={{ fontWeight: "bold" }}>Total Occupied:</span> {totalOccupied}
                </Typography>
              </CardContent>
            </Card>
          </ArgonBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default AllProjects;
