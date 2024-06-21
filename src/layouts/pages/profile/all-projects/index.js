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
import PieChart from "examples/Charts/PieChart";

function AllProjects() {
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
    },
    pieChart: {
      labels: ["Facebook", "Direct", "Organic", "Referral"],
      datasets: {
        label: "Projects",
        backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
        data: [15, 20, 12, 60],
      },
    },
  });

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
    fetchData()
  };

  const handleSubmit = () => {
    if (fromDate && toDate) {
      setSubmittedDates({ fromDate, toDate });
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
    // Call the API only when both dates are set
    if (submittedDates.fromDate && submittedDates.toDate) {
      fetchData(submittedDates.fromDate, submittedDates.toDate);
    }else{
      fetchData(fromDate,toDate)
    }
  }, [submittedDates]);

  const fetchData = async (fromDate, toDate) => {
    try {
      // Construct the URL based on whether dates are provided
      let url = 'https://api.example.com/data';
      if (fromDate && toDate) {
        url += `?from=${fromDate}&to=${toDate}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Update chart data based on the response
      setChartData({
        verticalBar: {
          labels: data.verticalBar.labels,
          datasets: [
            {
              label: `Sales by age (${fromDate} to ${toDate})`,
              color: "dark",
              data: data.verticalBar.data,
            },
          ],
        },
        lineChart: {
          labels: data.lineChart.labels,
          datasets: data.lineChart.datasets,
        },
        pieChart: {
          labels: data.pieChart.labels,
          datasets: data.pieChart.datasets,
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
              title="Multi Line Chart"
              chart={chartData.lineChart}
            />
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            <PieChart
              title="Pie Chart"
              chart={chartData.pieChart}
            />
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArgonBox mb={6}>
            <VerticalBarChart
              title="Vertical Bar Chart"
              chart={chartData.verticalBar}
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
  );
}

export default AllProjects;
