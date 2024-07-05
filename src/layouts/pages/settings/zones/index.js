import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonSelect from "components/ArgonSelect";
import DefaultZonesCard from "examples/Cards/ProjectCards/DefaultZonesCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormLabel, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Formik, Form, Field } from 'formik';
import ArgonButton from "components/ArgonButton";

import * as Yup from 'yup';

import homeDecor1 from "assets/images/settingImages/Reception.png";
import homeDecor2 from "assets/images/settingImages/HallWay.png";
import homeDecor3 from "assets/images/settingImages/LabArea.png";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import FormField from "layouts/pages/account/components/FormField";

const initialCameraData = [
  {
    image: homeDecor1,
    label: "Reception",
    label1: "Zone 1",
    title: "Online",
    description:
      "As Uber works through a huge amount of internal management turmoil.",
    authors: [
      { image: team1, name: "Elena Morison" },
      { image: team2, name: "Ryan Milly" },
      { image: team3, name: "Nick Daniel" },
      { image: team4, name: "Peterson" },
    ],
  },
  {
    image: homeDecor2,
    label: "Hallway",
    title: "Offline",
    label1: "Zone 2",
    description:
      "Music is something that every person has his or her own specific opinion about.",
    authors: [
      { image: team3, name: "Nick Daniel" },
      { image: team4, name: "Peterson" },
      { image: team1, name: "Elena Morison" },
      { image: team2, name: "Ryan Milly" },
    ],
  },
  {
    image: homeDecor2,
    label: "Hallway",
    title: "Offline",
    label1: "Zone 1",
    description:
      "Music is something that every person has his or her own specific opinion about.",
    authors: [
      { image: team3, name: "Nick Daniel" },
      { image: team4, name: "Peterson" },
      { image: team1, name: "Elena Morison" },
      { image: team2, name: "Ryan Milly" },
    ],
  },
  {
    image: homeDecor3,
    label: "LabArea",
    title: "Online",
    label1: "Zone 3",
    description:
      "Different people have different taste, and various types of music.",
    authors: [
      { image: team4, name: "Peterson" },
      { image: team3, name: "Nick Daniel" },
      { image: team2, name: "Ryan Milly" },
      { image: team1, name: "Elena Morison" },
    ],
  },
  {
    image: homeDecor3,
    label: "LabArea",
    title: "Online",
    label1: "Zone 2",
    description:
      "Different people have different taste, and various types of music.",
    authors: [
      { image: team4, name: "Peterson" },
      { image: team3, name: "Nick Daniel" },
      { image: team2, name: "Ryan Milly" },
      { image: team1, name: "Elena Morison" },
    ],
  },
  {
    image: homeDecor3,
    label: "LabArea",
    title: "Online",
    label1: "Zone 1",
    description:
      "Different people have different taste, and various types of music.",
    authors: [
      { image: team4, name: "Peterson" },
      { image: team3, name: "Nick Daniel" },
      { image: team2, name: "Ryan Milly" },
      { image: team1, name: "Elena Morison" },
    ],
  },
];

const cameraOption = [
  { value: "", label: "Select camera" },
  { value: "1", label: "Reception" },
  { value: "2", label: "Hallway" },
  { value: "3", label: "LabArea" },
];

const zoneTypeOption = [
  { value: "", label: "Select zone type" },
  { value: "1", label: "Dwell zone" },
  { value: "2", label: "Footfall zone" },
  { value: "3", label: "Product-instruction zone" },
];

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Zone Name is required"),
  // Add more validation rules as needed
});

function Zones() {
  const [selectedCamera, setSelectedCamera] = useState("");
  const [filteredCameraData, setFilteredCameraData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [zoneName, setZoneName] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    filterCameraData(selectedCamera);
  }, [selectedCamera]);

  const handleCameraChange = (selectedOption) => {
    setSelectedCamera(selectedOption.label);
  };
  const handleZoneTypeChange = (zonetypevalue) => {
    console.log(zonetypevalue)
  }

  const filterCameraData = (cameraValue) => {
    if (cameraValue === "") {
      setFilteredCameraData([]); // If no camera selected, clear filtered data
    } else {
      const filteredData = initialCameraData.filter(
        (camera) => camera.label === cameraValue
      );
      setFilteredCameraData(filteredData);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
    setImagePreview(null)
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddZone = (values) => {
    console.log("Zone Name:", values.name);
    console.log("Static Image URL:", values.image);

    // Add logic here to update your data or perform API calls.
    setZoneName(values.name);

    // For demonstration, setting the static image URL as the image value
    setImagePreview(values.image);

    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageFile(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCamera = (id) => {
    console.log(id)
}
const handleEditCamera = (camera) => {
  setSelectedCamera(camera);
  setIsModalOpen(true);
};
  return (
    <DashboardLayout>
      <DashboardNavbar ShowOrHideTheSelectStoreInput={true} />
      <Grid
        container
        spacing={3}
        my={8}
        sx={{
          backgroundColor: "#fff",
          width: "initial !important",
          marginLeft: "initial !important",
          borderRadius: "15px"
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <ArgonBox mb={1}>
            <ArgonBox mb={0.5}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Zone listing
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox p={2} sx={{ position: "relative", display: "flex", alignItems: "center" }}>
              <ArgonTypography variant="h6" fontWeight="medium">
                Camera &nbsp;&nbsp;
              </ArgonTypography>
              <ArgonSelect
                placeholder="Select camera"
                options={cameraOption}
                value={cameraOption.find(
                  (option) => option.value === selectedCamera
                )}
                onChange={handleCameraChange}
              />
            </ArgonBox>
          </ArgonBox>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <ArgonBox p={2}>
            <Grid container spacing={3}>
              {filteredCameraData.length === 0 ? (
                <Grid item xs={12}>
                  <ArgonTypography variant="body1" sx={{ textAlign: "center" }}>
                    No camera option selected.
                  </ArgonTypography>
                </Grid>
              ) : (
                filteredCameraData.map((camera, index) => (
                  <Grid item key={index} xs={12} md={6} xl={3}>
                    <DefaultZonesCard
                      image={camera.image}
                      label={camera.label}
                      title={camera.title}
                      description={camera.description}
                      label1={camera.label1}
                      action={[
                        {
                            type: "internal",
                            color: "info",
                            label: "Edit",
                            onClick: () => handleEditCamera(camera),
                        },
                        {
                            type: "internal",
                            color: "error",
                            label: "Delete",
                            onClick: () => handleDeleteCamera(camera),
                        }
                    ]}
                      authors={camera.authors}
                      onClick={handleCardClick}
                    />
                  </Grid>
                ))
              )}

              {/* Placeholder for adding new zones */}
              {(selectedCamera && filteredCameraData.length !== 0) && (
                <Grid item xs={12} md={6} xl={3} sx={{ cursor: "pointer" }} onClick={handleCardClick}>
                  <PlaceholderCard
                    title={{ variant: "h5", text: "Add New Zone" }}
                    outlined
                  />
                </Grid>
              )}
            </Grid>
          </ArgonBox>
        </Grid>
      </Grid>

      {/* Modal for adding new zone */}
      <Dialog open={isModalOpen} onClose={handleModalClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>
          Add New Zone
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: "", image: null }}
            validationSchema={validationSchema}
            onSubmit={handleAddZone}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form>
                <ArgonBox>
                  <ArgonBox p={0} sx={{ position: "relative", display: "flex", alignItems: "center" }} width="100%">
                    <ArgonBox>
                      <ArgonTypography variant="h6" fontWeight="medium" style={{
                        fontSize: "0.80rem", fontWeight: "700", display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}>
                        Zone Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </ArgonTypography>
                    </ArgonBox>
                    <ArgonSelect
                      className="custom-select-container"
                      placeholder="Select zone type"
                      options={zoneTypeOption}
                      onChange={handleZoneTypeChange}
                    />
                  </ArgonBox>
                  <ArgonBox mt={2} width="100%">
                    <FormField
                      as={TextField}
                      name="name"
                      variant="outlined"
                      label="Zone name"
                      placeholder="Enter zone name here"
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </ArgonBox>

                  <ArgonBox mt={2} width="100%">
                    <img
                      src={filteredCameraData[0].image}
                      alt="Selected"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </ArgonBox>
                </ArgonBox>
                <DialogActions>
                  <ArgonButton onClick={handleModalClose} color="secondary">
                    Cancel
                  </ArgonButton>
                  <ArgonButton type="submit" color="info">
                    Add
                  </ArgonButton>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default Zones;
