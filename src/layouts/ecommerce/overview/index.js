import React, { useMemo, useState, useEffect, } from 'react';
import Modal from 'react-modal';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';
import CloseIcon from '@mui/icons-material/Close';
import ArgonButton from 'components/ArgonButton';

import DefaultLineChart from 'examples/Charts/LineCharts/DefaultLineChart';
import SalesTable from 'examples/Tables/SalesTable';
import DataTable from 'examples/Tables/DataTable';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import HorizontalBarChart from 'examples/Charts/BarCharts/HorizontalBarChart';
import ChannelsChart from 'layouts/ecommerce/overview/components/ChannelsChart';

import { makeStyles } from '@mui/styles';
import { useStore } from 'globalContext/GlobalContext';
import {
  fetchAverageDwellTime,
  fetchDwellTimeDistribution,
  fetchDwellTimePerDay,
  fetchPeakHoursData,
  fetchFootfallContPerZone,
  fetchFootfallHourly,
  fetchDistributionOfVisitorsByAgeGroup
} from './dashboardAllApi'; // Adjust the import path as needed
import VerticalBarChart from 'examples/Charts/BarCharts/VerticalBarChart';
import PieChart from 'examples/Charts/PieChart';
import axios from 'axios';
import { API_Url } from 'utils/API';

const useStyles = makeStyles({
  removeButton: {
    '&:hover': {
      backgroundColor: 'rgb(17, 205, 239) !important',
      color: '#fff',
    },
  },
});

const customModalStyles = {
  content: {
    top: '50%',
    left: 'calc(50% + 128px)', // Adjusted to account for the sidebar
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 'calc(100% - 320px)', // Adjusted to account for the sidebar
    maxHeight: '80%',
    overflowY: 'auto',
    padding: '20px',
    position: 'relative',
    zIndex: 1000, // Ensuring the modal is above other elements
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
};

function Overview() {
  const classes = useStyles();
  const { selectedStore, token } = useStore();
  const [dashboardCards, setDashboardCards] = useState([]);
  const [modalCards, setModalCards] = useState([
    { id: 1, title: 'Average Dwell Time Per Zone', component: <VerticalBarChart chart={{}} /> },
    { id: 2, title: 'Dwell Time Distribution', component: <VerticalBarChart chart={{}} /> },
    { id: 3, title: 'Average Dwell Time Per Day', component: <DefaultLineChart chart={{}} /> },
    { id: 4, title: 'Dwell Peak Hours Analysis', component: <DefaultLineChart chart={{}} /> },
    { id: 5, title: 'Footfall Distribution Of Visitors Counter Per Zones', component: <VerticalBarChart chart={{}} /> },
    { id: 6, title: 'Hourly Distribution Of Visitors Across Different Zones', component: <DefaultLineChart chart={{}} /> },
    { id: 7, title: 'Distribution of visitors by age group', component: <PieChart chart={{}} /> },

  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // State for storing fetched data
  const [channelData, setChannelData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [horizontalBarChartData, setHorizontalBarChartData] = useState(null);
  const [peakHourAnalysis, setPeakHoursData] = useState({
    labels: [],
    datasets: [],
  });
  const [visitorData, setVisitorData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [demographicsData, setDemographicsData] = useState(null);
  const [firstEntryTime, setFirstEntryTime] = useState("");
  const [lastExitTime, setLastExitTime] = useState("");
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      if (selectedStore) {
        try {
          const channelDataResponse = await fetchAverageDwellTime(selectedStore);
          setChannelData({
            labels: Object.keys(channelDataResponse.Data),
            datasets: [
              {
                label: "Average Dwell Time (minutes)",
                color: "dark",
                data: Object.values(channelDataResponse.Data),
              },
            ],
          });


          const lineChartDataResponse = await fetchDwellTimeDistribution(selectedStore);
          setLineChartData({
            labels: Object.keys(lineChartDataResponse.Data),
            datasets: [
              {
                label: "Dwell Time Distribution",
                color: "info",
                data: Object.values(lineChartDataResponse.Data),
              },
            ],
          });

          const Data = await fetchDwellTimePerDay(selectedStore);
          if (Data && Object.keys(Data.Data).length > 0) {
            const labels = Object.keys(Data.Data[Object.keys(Data.Data)[0]]);
            const datasets = Object.keys(Data.Data).map((zoneKey) => ({
              label: zoneKey,
              color: "info",
              data: Object.values(Data.Data[zoneKey]),
            }));

            setHorizontalBarChartData({ labels, datasets });
          } else {
            setHorizontalBarChartData({})
            console.error("Data.Data is empty or undefined.");
          }
          // peak hour analysis
          const DataPeak = await fetchPeakHoursData(selectedStore);
          if (DataPeak && Object.keys(DataPeak.Data).length > 0) {
            const labels = Object.keys(Object.values(DataPeak.Data)[0]).map(num => Number(num))
            const colors = ["info", "primary", "secondary", "success", "error", "dark"];

            const datasets = Object.keys(DataPeak.Data).map((zoneKey, index) => ({
              label: zoneKey,
              color: colors[index % colors.length],
              data: Object.values(DataPeak.Data[zoneKey]),
            }));

            setPeakHoursData({ labels, datasets });
          } else {
            console.error("Data is empty or undefined.");
          }

          // footfall zone distribution  across different zones

          const DataFootfallZoneDistribution = await fetchFootfallContPerZone(selectedStore);
          setVisitorData(DataFootfallZoneDistribution.data);

          // footfall hourly 

          const DataFootfallHourly = await fetchFootfallHourly(selectedStore);
          setHourlyData(DataFootfallHourly.Data);
          setFirstEntryTime(DataFootfallHourly.first_entry_time);
          setLastExitTime(DataFootfallHourly.last_exit_time);
          setTotalCount(DataFootfallHourly.total_count);


          // Distribution of visitors by age group

          const DataDistributionOfVisitorsByAgeGroup = await fetchDistributionOfVisitorsByAgeGroup(selectedStore);
          setDemographicsData(DataDistributionOfVisitorsByAgeGroup.Data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [selectedStore]);

  useEffect(() => {
    const fetchUserWidgets = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_Url}/user_widget`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': `${token}`,
            },
          });
          const result = await response.json();
          if (result.status === 1) {
            const selectedIds = result.data;
            const selected = modalCards.filter(card => selectedIds.includes(card.id));
            const remaining = modalCards.filter(card => !selectedIds.includes(card.id));
            setDashboardCards(selected);
            setModalCards(remaining);
          }
        } catch (error) {
          console.error('Error fetching user widgets:', error);
        }
      }
    };

    fetchUserWidgets();
  }, [token !== ""]);


  useMemo(() => {
    console.log("Selected Store:", selectedStore);
  }, [selectedStore]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCards([]);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleCardSelection = (card) => {
    const isSelected = selectedCards.some(selected => selected.id === card.id);
    setSelectedCards(prevSelected =>
      isSelected
        ? prevSelected.filter(selected => selected.id !== card.id)
        : [...prevSelected, card]
    );
  };

  const addCardsToDashboard = async () => {
    try {
      const selectedIds = selectedCards.map(card => card.id);
      const response = await fetch(`${API_Url}/add_widget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${token}`,
        },
        body: JSON.stringify(selectedIds),
      });
      const result = await response.json();
      if (result.status === 1) {
        setDashboardCards([...dashboardCards, ...selectedCards]);
        setModalCards(modalCards.filter(card => !selectedIds.includes(card.id)));
        setIsModalOpen(false);
        setSelectedCards([]);
      } else {
        console.error('Failed to add widgets:', result.message);
      }
    } catch (error) {
      console.error('Error adding widgets:', error);
    }
  };

  const removeCardFromDashboard = async (cardToRemove) => {
    try {
      setDashboardCards(dashboardCards.filter(card => card.id !== cardToRemove.id));
      setModalCards([...modalCards, cardToRemove]);
      const response = await fetch(`${API_Url}/remove_widget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${token}`,
        },
        body: JSON.stringify({ id: cardToRemove.id }),
      });

      const result = await response.json();
      if (result.status === 1) {
        console.log('Widget removed successfully:', result.message);
      } else {
        console.error('Failed to remove widget:', result.message);
      }
    } catch (error) {
      console.error('Error removing widget:', error);
    }
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} style={{ alignItems: 'stretch' }}>
        {dashboardCards.map((card, index) => (
          <Grid key={card.id} item xs={12} sm={6}>
            <Card style={{ height: '100%' }}>
              <ArgonBox pt={3} px={3} display="flex" justifyContent="space-between">
                <ArgonTypography variant="h6" fontWeight="medium">
                  {card.title}
                </ArgonTypography>
                <ArgonButton
                  onClick={() => removeCardFromDashboard(card)}
                  size="small"
                  color="danger"
                  className={classes.removeButton}
                  style={{ alignSelf: 'flex-start' }}
                >
                  Remove
                </ArgonButton>
              </ArgonBox>
              <ArgonBox py={1}>
                {card.id === 1 && channelData && <VerticalBarChart chart={channelData} />}
                {card.id === 2 && lineChartData && <VerticalBarChart chart={lineChartData} />}
                {card.id === 3 && <DefaultLineChart chart={horizontalBarChartData} />}
                {card.id === 4 && <DefaultLineChart chart={peakHourAnalysis} />}
                {card.id === 5 && <VerticalBarChart
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
                />}
                {card.id === 6 && hourlyData && <DefaultLineChart
                  chart={{
                    labels: Array.from(Array(24).keys()).map((hour) => `${hour}:00`),
                    datasets: Object.keys(hourlyData).map((zone, index) => ({
                      label: zone,
                      data: Object.values(hourlyData[zone]),
                    })),
                  }}
                />}
                {card.id === 7 && demographicsData && (
                  <PieChart
                    chart={{
                      labels: Object.keys(demographicsData.age).map((ageGroup) => ageGroup),
                      datasets: {
                        label: "Age Groups",
                        backgroundColors: ["info", "primary", "dark", "secondary", "warning", "success", "info", "dark"],
                        data: Object.values(demographicsData.age).map((item) => item.total),
                      }
                    }
                    }
                  />
                )}


              </ArgonBox>
            </Card>
          </Grid>
        ))}
        {modalCards.length > 0 && (
          <Grid item xs={12} sm={6}>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: '2px dotted #ccc',
                backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/07/25/08/07/add-6491203_1280.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20%',
                backgroundPosition: 'center',
                transition: 'background-color 0.3s, box-shadow 0.3s',
                backgroundColor: isHovered ? '#f0f0f0' : '#ffffff',
                boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none',
              }}
              onClick={openModal}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ArgonBox display="flex" justifyContent="center" alignItems="center" height="100%" minHeight="300px"></ArgonBox>
            </Card>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} style={{ marginTop: 'auto' }}>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Select Chart Cards"
          style={customModalStyles} // Correctly passing the style object
        >
          <div style={customModalStyles.closeButton} onClick={closeModal}>
            <CloseIcon />
          </div>
          <h2>Select Chart Cards</h2>
          {modalCards.length > 0 ? (
            <Grid container spacing={3}>
              {modalCards.map(card => (
                <Grid key={card.id} item xs={12} sm={6}>
                  <Card
                    style={{
                      marginBottom: '10px',
                      cursor: 'pointer',
                      backgroundColor: selectedCards.some(selected => selected.id === card.id) ? '#e0e0e0' : 'transparent',
                      border: selectedCards.some(selected => selected.id === card.id) ? '2px solid #3f51b5' : 'none',
                      height: '100%',
                    }}
                    onClick={() => toggleCardSelection(card)}
                  >
                    <ArgonBox p={2}>
                      <ArgonTypography>
                        {card.title}
                      </ArgonTypography>
                    </ArgonBox>
                    <ArgonBox py={1}>
                      {card.id === 1 && channelData && <VerticalBarChart chart={channelData} />}
                      {card.id === 2 && lineChartData && <VerticalBarChart chart={lineChartData} />}
                      {card.id === 3 && horizontalBarChartData && <DefaultLineChart chart={horizontalBarChartData} />}
                      {card.id === 4 && <DefaultLineChart chart={peakHourAnalysis} />}
                      {card.id === 5 && <VerticalBarChart
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
                      />}
                      {card.id === 6 && hourlyData && <DefaultLineChart
                        chart={{
                          labels: Array.from(Array(24).keys()).map((hour) => `${hour}:00`),
                          datasets: Object.keys(hourlyData).map((zone, index) => ({
                            label: zone,
                            data: Object.values(hourlyData[zone]),
                          })),
                        }}
                      />}
                      {card.id === 7 && demographicsData && (
                        <PieChart
                          chart={{
                            labels: Object.keys(demographicsData.age).map((ageGroup) => ageGroup),
                            datasets: {
                              label: "Age Groups",
                              backgroundColors: ["info", "primary", "dark", "secondary", "warning", "success", "info", "dark"],
                              data: Object.values(demographicsData.age).map((item) => item.total),
                            }
                          }
                          }
                        />
                      )}
                    </ArgonBox>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <ArgonTypography>No cards available</ArgonTypography>
          )}
          {selectedCards.length > 0 && (
            <ArgonBox pt={2} px={3} style={{ textAlign: 'end' }}>
              <ArgonButton onClick={addCardsToDashboard} color="primary">
                Add Selected Cards ({selectedCards.length})
              </ArgonButton>
            </ArgonBox>
          )}
        </Modal>
      </Grid>
    </DashboardLayout>
  );
}

export default Overview;
