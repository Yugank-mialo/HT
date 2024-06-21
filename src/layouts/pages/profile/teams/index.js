import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Header from "layouts/pages/profile/components/Header";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

function Teams() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [submittedDates, setSubmittedDates] = useState({ fromDate: null, toDate: null });
  const [chartData, setChartData] = useState({
    verticalBar: {
      labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
      datasets: [
        {
          label: "Sales by age",
          color: "dark",
          data: [15, 20, 12, 60, 20, 15],
        },
      ],
    },
    lineChart: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Organic Search",
          color: "info",
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
      ],
    },
  });

  // Simulating initial API call when component mounts
  useEffect(() => {
    fetchData(); // Call API without fromDate and toDate initially
  }, []); // Empty dependency array ensures this effect runs only once

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
    setSubmittedDates({ fromDate: null, toDate: null }); // Reset submitted dates
  };

  const handleSubmit = () => {
    if (fromDate && toDate) {
      setSubmittedDates({ fromDate, toDate }); // Store submitted dates
    }
  };

  const formatDate = (date1) => {
    const date = new Date(date1);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-indexed, hence +1
    const day = ('0' + date.getDate()).slice(-2);
    
    // Form the yyyy-mm-dd format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    // Call the API only when both dates are submitted
    if (submittedDates.fromDate && submittedDates.toDate) {
      fetchData(submittedDates.fromDate, submittedDates.toDate);
    }
  }, [submittedDates]); // Run this effect when submittedDates changes

  const fetchData = async (fromDateParam, toDateParam) => {
    try {
      let url = 'https://api.example.com/data';
      if (fromDateParam && toDateParam) {
        url += `?from=${fromDateParam}&to=${toDateParam}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Assuming data structure matches your chartData expectations
      setChartData({
        verticalBar: {
          labels: data.verticalBar.labels,
          datasets: data.verticalBar.datasets,
        },
        lineChart: {
          labels: data.lineChart.labels,
          datasets: data.lineChart.datasets,
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
              title="Vertical Bar Chart"
              chart={chartData.verticalBar}
            />
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            <DefaultLineChart
              title="Single Line Chart"
              chart={chartData.lineChart}
            />
          </ArgonBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Teams;
