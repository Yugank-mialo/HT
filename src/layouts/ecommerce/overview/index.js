import React, { useState } from 'react';
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
import defaultLineChartData from 'layouts/ecommerce/overview/data/defaultLineChartData';
import horizontalBarChartData from 'layouts/ecommerce/overview/data/horizontalBarChartData';
import salesTableData from 'layouts/ecommerce/overview/data/salesTableData';
import dataTableData from 'layouts/ecommerce/overview/data/dataTableData';

import { makeStyles } from '@mui/styles';

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
  const [dashboardCards, setDashboardCards] = useState([]);
  const [modalCards, setModalCards] = useState([
    { id: 1, title: 'Channels Chart', component: <ChannelsChart /> },
    { id: 2, title: 'Default Line Chart', component: <DefaultLineChart chart={defaultLineChartData} /> },
    { id: 3, title: 'Horizontal Bar Chart', component: <HorizontalBarChart chart={horizontalBarChartData} /> },
    { id: 4, title: 'Sales Table', component: <SalesTable title="Sales by Country" rows={salesTableData} /> },
    { id: 5, title: 'Data Table', component: <DataTable table={dataTableData} entriesPerPage={false} showTotalEntries={false} isSorted={false} noEndBorder /> },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

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

  const addCardsToDashboard = () => {
    setDashboardCards([...dashboardCards, ...selectedCards]);
    setModalCards(modalCards.filter(card => !selectedCards.some(selected => selected.id === card.id)));
    setIsModalOpen(false);
    setSelectedCards([]);
  };

  const removeCardFromDashboard = (cardToRemove) => {
    setDashboardCards(dashboardCards.filter(card => card.id !== cardToRemove.id));
    setModalCards([...modalCards, cardToRemove]);
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
                {card.component}
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
                      {card.component}
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
