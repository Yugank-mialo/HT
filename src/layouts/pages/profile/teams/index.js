import { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Header from "layouts/pages/profile/components/Header";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Card } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Teams() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [submittedDates, setSubmittedDates] = useState({ fromDate: null, toDate: null });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Average Dwell Time (minutes)",
        color: "dark",
        data: [],
      },
    ],
  });
  const [dwellTimeDistribution, setDwellTimeDistribution] = useState({ labels: [], data: [] });
  const [averageDwellTimePerDay, setAverageDwellTimePerDay] = useState({
    labels: [],
    datasets: [],
  });
  const [peakHoursData, setPeakHoursData] = useState({
    labels: [],
    datasets: [],
  });
  const [topZones, setTopZones] = useState({
    fastest: [],
    slowest: [],
  });

  const [leastBusyZone, setLeastBusyZone] = useState({
    leastCustomerCount: {},
    leastWorkingMinute: {},
  });
  const [busyZone, setBusyZone] = useState({
    mostCustomerCount: {},
    mostWorkingMinute: {},
  });
  const [dwellZoneTable, setDwellZoneTable] = useState({
    countsPerZone: {},
    hourlyFlowRate: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://106.51.37.159:9991/AverageDwellTime");
        const data = response.data.Data;

        const labels = Object.keys(data);
        const dwellTimes = Object.values(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Average Dwell Time (minutes)",
              color: "dark",
              data: dwellTimes,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get("http://106.51.37.159:9991/dwell_time_distribution", {
        params: {
          from_date: "2024-06-01",
          to_date: "2024-06-01",
          store_id: 1,
        },
      })
      .then((response) => {
        const { Data } = response.data;
        const labels = Object.keys(Data);
        const data = Object.values(Data);

        setDwellTimeDistribution({ labels, data });
      })
      .catch((error) => {
        console.error("Error fetching the dwell time distribution data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://106.51.37.159:9991/dwell_time_per_day", {
        params: {
          from_date: "2024-06-01",
          to_date: "2024-06-06",
          store_id: 1,
        },
      })
      .then((response) => {
        const { Data } = response.data;

        if (Data) {
          // Extract labels (dates) from the first zone's data (assuming it's consistent)
          const labels = Object.keys(Data[Object.keys(Data)[0]]);

          // Prepare datasets for each zone
          const datasets = Object.keys(Data).map((zoneKey) => ({
            label: zoneKey,
            color: "info", // Adjust color if needed
            data: Object.values(Data[zoneKey]),
          }));

          setAverageDwellTimePerDay({ labels, datasets });
        } else {
          console.error("Data is empty or undefined.");
          // Handle this case according to your application's logic
        }
      })
      .catch((error) => {
        console.error("Error fetching average dwell time per day data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchPeakHoursData = async () => {
      try {
        const response = await axios.get("http://106.51.37.159:9991/hourly_dwell_time", {
          params: {
            date: "2024-06-02",
          },
        });

        const { Data } = response.data;

        if (Data) {
          // Extract labels (hours of the day)
          const labels = Object.keys(Data[Object.keys(Data)[0]]).map(Number); // Assuming hours are numeric strings

          // Define colors for datasets
          const colors = ["info", "primary", "secondary", "success", "error", "dark"]; // Example colors

          // Prepare datasets for each zone with different colors
          const datasets = Object.keys(Data).map((zoneKey, index) => ({
            label: zoneKey,
            color: colors[index % colors.length], // Cycle through colors
            data: Object.values(Data[zoneKey]),
          }));

          setPeakHoursData({ labels, datasets });
        } else {
          console.error("Data is empty or undefined.");
          // Handle this case according to your application's logic
        }
      } catch (error) {
        console.error("Error fetching peak hours data:", error);
      }
    };

    fetchPeakHoursData();
  }, []);

  useEffect(() => {
    const fetchTopZonesData = async () => {
      try {
        const response = await axios.get("http://106.51.37.159:9991/top_zones", {
          params: {
            from_date: "2024-06-01",
            to_date: "2024-06-10",
            store_id: 1,
          },
        });

        const { fastest_zone, slowest_zone } = response.data;

        // Convert object to array and sort by dwell time (value)
        const fastestZonesArray = Object.entries(fastest_zone)
          .sort((a, b) => a[1] - b[1])
          .slice(0, 3);
        const slowestZonesArray = Object.entries(slowest_zone)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);

        setTopZones({ fastest: fastestZonesArray, slowest: slowestZonesArray });
      } catch (error) {
        console.error("Error fetching top zones data:", error);
      }
    };

    fetchTopZonesData();
  }, []);

  useEffect(() => {
    const fetchLeastBusyZoneData = async () => {
      try {
        const response = await axios.get("http://106.51.37.159:9991/least_busy_zone", {
          params: {
            from_date: "2024-06-01",
            to_date: "2024-06-12",
            store_id: 1,
          },
        });

        const { data } = response.data;

        if (data) {
          setLeastBusyZone({
            leastCustomerCount: data.least_customer_count,
            leastWorkingMinute: data.least_working_minute,
          });
        } else {
          console.error("Data is empty or undefined.");
          // Handle this case according to your application's logic
        }
      } catch (error) {
        console.error("Error fetching least busy zone data:", error);
      }
    };

    fetchLeastBusyZoneData();
  }, []);

  useEffect(() => {
    const fetchBusyZoneData = async () => {
      try {
        const response = await axios.get("http://106.51.37.159:9991/busy_zone", {
          params: {
            from_date: "2024-06-01",
            to_date: "2024-06-12",
            store_id: 1,
          },
        });

        const { data } = response.data;

        if (data) {
          setBusyZone({
            mostCustomerCount: data.most_customer_count,
            mostWorkingMinute: data.most_working_minute,
          });
        } else {
          console.error("Data is empty or undefined.");
          // Handle this case according to your application's logic
        }
      } catch (error) {
        console.error("Error fetching busy zone data:", error);
      }
    };

    fetchBusyZoneData();
  }, []);

  useEffect(() => {
    const fetchDwellZoneTableData = async () => {
      try {
        const response = await axios.get("http://106.51.37.159:9991/dwellzone_table", {
          params: {
            store_id: 1,
            from_date: "2024-06-01",
            to_date: "2024-06-15",
          },
        });
        const { counts_per_zone, hourly_flow_rate, total_count } = response.data;

        setDwellZoneTable({
          countsPerZone: counts_per_zone,
          hourlyFlowRate: hourly_flow_rate,
          totalCount: total_count,
        });
      } catch (error) {
        console.error("Error fetching dwell zone table data:", error);
      }
    };

    fetchDwellZoneTableData();
  }, []);

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
              <VerticalBarChart title="Average Dwell time per zone" chart={chartData} />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <VerticalBarChart
                title="Dwell Time Distribution"
                chart={{
                  labels: dwellTimeDistribution.labels,
                  datasets: [
                    {
                      label: "People Count",
                      color: "dark",
                      data: dwellTimeDistribution.data,
                    },
                  ],
                }}
              />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <DefaultLineChart title="Average Dwell time per day" chart={averageDwellTimePerDay} />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ArgonBox mb={6}>
              <DefaultLineChart title=" Peak hours analysis" chart={peakHoursData} />
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={12}>
            <ArgonBox mb={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Dwell Zone Table
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead></TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="left"></TableCell>
                          {Object.keys(dwellZoneTable.countsPerZone).map((zone) => (
                            <TableCell key={zone} align="center" style={{ fontWeight: "bold" }}>
                              {zone}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell align="left" style={{ fontWeight: "bold" }}>
                            Counts Per Zone
                          </TableCell>
                          {Object.values(dwellZoneTable.countsPerZone).map((count, index) => (
                            <TableCell key={index} align="center">
                              {count}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell align="left" style={{ fontWeight: "bold" }}>
                            Hourly Flow Rate
                          </TableCell>
                          {Object.values(dwellZoneTable.hourlyFlowRate).map((rate, index) => (
                            <TableCell key={index} align="center">
                              {rate}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell
                            colSpan={Object.keys(dwellZoneTable.countsPerZone).length + 1}
                            align="center"
                          >
                            Total Count: {dwellZoneTable.totalCount}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </ArgonBox>
          </Grid>

          <Grid item xs={12} md={4}>
            <ArgonBox mb={4}>
              <Card style={{ minHeight: "400px" }}>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    Top Three Fastest and Slowest Zones
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h3"
                    color="black"
                    fontWeight="bold"
                    gutterBottom
                    style={{ marginTop: "10px" }}
                  >
                    Fastest Zones:
                  </Typography>
                  {topZones.fastest.map(([zone, avgDwellTime]) => (
                    <Typography key={zone} color="textSecondary" gutterBottom>
                      {zone}: {avgDwellTime} minutes
                    </Typography>
                  ))}
                  <Typography
                    variant="h6"
                    component="h3"
                    color="black"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Slowest Zones:
                  </Typography>
                  {topZones.slowest.map(([zone, avgDwellTime]) => (
                    <Typography key={zone} color="textSecondary" gutterBottom>
                      {zone}: {avgDwellTime} minutes
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <ArgonBox mb={4}>
              <Card style={{ minHeight: "400px" }}>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    Least Busy Zone (in terms of time / no of customers)
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h3"
                    color="black"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Least Customer Count Zone:
                  </Typography>
                  {Object.entries(leastBusyZone.leastCustomerCount).map(([zone, count]) => (
                    <Typography key={zone} color="textSecondary" gutterBottom>
                      {zone}: {count} customers
                    </Typography>
                  ))}
                  <Typography
                    variant="h6"
                    component="h3"
                    color="black"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Least Working Minute Zone:
                  </Typography>
                  {Object.entries(leastBusyZone.leastWorkingMinute).map(([zone, minutes]) => (
                    <Typography key={zone} color="textSecondary" gutterBottom>
                      {zone}: {minutes} minutes
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </ArgonBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <ArgonBox mb={4}>
              <Card style={{ minHeight: "400px" }}>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    Busy Zone (in terms of time / no of customers)
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    color="black"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Most Customer Count Zone:
                  </Typography>
                  {Object.entries(busyZone.mostCustomerCount).map(([zone, count]) => (
                    <Typography key={zone} color="textSecondary" gutterBottom>
                      {zone}: {count} customers
                    </Typography>
                  ))}
                  <Typography
                    variant="h6"
                    component="h2"
                    color="black"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Most Working Minute Zone:
                  </Typography>
                  {Object.entries(busyZone.mostWorkingMinute).map(([zone, minutes]) => (
                    <Typography key={zone} color="textSecondary" gutterBottom>
                      {zone}: {minutes} minutes
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </ArgonBox>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
}

export default Teams;
