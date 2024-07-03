import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonSelect from "components/ArgonSelect";
import DefaultZonesCard from "examples/Cards/ProjectCards/DefaultZonesCard";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
const initialCameraData = [
    {
        image: homeDecor1,
        label: "Camera 1",
        title: "Online",
        url: "http://www.google.com",
        description: "As Uber works through a huge amount of internal management turmoil.",
        authors: [
            { image: team1, name: "Elena Morison" },
            { image: team2, name: "Ryan Milly" },
            { image: team3, name: "Nick Daniel" },
            { image: team4, name: "Peterson" },
        ],
    },
    {
        image: homeDecor2,
        label: "Camera 2",
        title: "Offline",
        url: "http://www.google.com",
        description: "Music is something that every person has his or her own specific opinion about.",
        authors: [
            { image: team3, name: "Nick Daniel" },
            { image: team4, name: "Peterson" },
            { image: team1, name: "Elena Morison" },
            { image: team2, name: "Ryan Milly" },
        ],
    },
    {
        image: homeDecor3,
        label: "Camera 3",
        title: "Online",
        url: "http://www.google.com",
        description: "Different people have different taste, and various types of music.",
        authors: [
            { image: team4, name: "Peterson" },
            { image: team3, name: "Nick Daniel" },
            { image: team2, name: "Ryan Milly" },
            { image: team1, name: "Elena Morison" },
        ],
    },
];
const monthOptions = [
    {value:"",label:"Select Camera"},
    { value: "1", label: "Camear 1" },
    { value: "2", label: "camera 2" },
    { value: "3", label: "camera 3" }
  ];

function Zones() {
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const [cameraData, setCameraData] = useState(initialCameraData);

  useEffect(() => {
    // Fetch data or perform initialization
  }, []);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
    // Handle month change logic if needed
  };

  // Options for months
  const handleEditCamera = (camera) => {
    setSelectedCamera(camera);
    setIsModalOpen(true);
};
  return (
    <DashboardLayout>
      <DashboardNavbar ShowOrHideTheSelectStoreInput={true} />
      <Grid container spacing={3} my={14}>
        <Grid item xs={12} md={12} lg={12}>
          <ArgonBox mb={3}>
          <Grid sx={{backgroundColor:"#fff"}}>

          <ArgonBox pt={2} px={2} >
                <ArgonBox >
                  <ArgonTypography variant="h6" fontWeight="medium">
                    Camera Listing
                  </ArgonTypography>
                </ArgonBox>
              </ArgonBox>
            <ArgonBox p={2}>
                <ArgonSelect
                  placeholder="Select Month"
                  options={monthOptions}
                  value={monthOptions.find((option) => option.value === selectedMonth)}
                  onChange={handleMonthChange}
                />
              </ArgonBox>


              {/* modal */}

              <ArgonBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultZonesCard
                  image={homeDecor1}
                  label="project #2"
                  title="modern"
                  description="As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "View Project",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultZonesCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that every person has his or her own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "View Project",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultZonesCard
                  image={homeDecor3}
                  label="project #3"
                  title="minimalist"
                  description="Different people have different taste, and various types of music."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "View Project",
                  }}
                  authors={[
                    { image: team4, name: "Peterson" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team1, name: "Elena Morison" },
                  ]}
                />
              </Grid>
            </Grid>
          </ArgonBox>
              </Grid>
          </ArgonBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Zones;
