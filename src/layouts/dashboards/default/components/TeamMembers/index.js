import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonBadge from "components/ArgonBadge";
import ArgonButton from "components/ArgonButton";
import ArgonTypography from "components/ArgonTypography";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Icon } from "@mui/material";

// Data
const data = [
  { img: team1, name: "Camera 1", status: "online", badge: "success", url: "http://www.google.com" },
  { img: team2, name: "Camera 2", status: "offline", badge: "error", url: "http://www.google.com" },
  { img: team3, name: "Camera 3", status: "offline", badge: "error", url: "http://www.google.com" },
  { img: team4, name: "Camera 4", status: "online", badge: "success", url: "http://www.google.com" },
];

// Validation schema for Formik
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  url: Yup.string().url("Invalid URL format").required("URL is required"),
});

function TeamMembers() {
  const [selectedCard, setSelectedCard] = useState(data[0]);
  const [formInitialValues, setFormInitialValues] = useState({
    name: data[0].name,
    url: data[0].url,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFormInitialValues({
      name: selectedCard.name,
      url: selectedCard.url,
    });
  }, [selectedCard]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNewCameraSubmit = (values) => {
    // Handle new camera submission
    console.log(values);
    handleModalClose();
  };

  return (
    <Card sx={{ height: "100%", overflow: "hidden" }}>
      <ArgonBox p={3} display="flex">
        <ArgonTypography variant="h5" textTransform="capitalize">
          Cameras
        </ArgonTypography>
        <Grid item ml="auto">
          <ArgonBox ml={{ xs: 0, sm: "auto" }} mt={{ xs: 2, sm: 0 }}>
            <ArgonButton
              color="info"
              size="small"
              sx={{
                px: 2,
              }}
              onClick={handleModalOpen}
            >
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp; Add
            </ArgonButton>
          </ArgonBox>
        </Grid>
      </ArgonBox>
      <ArgonBox pb={3} px={3}>
        <Grid container spacing={3}>
          {data.map((card, key) => (
            <Grid item xs={12} sm={6} md={3} key={key} onClick={() => handleCardClick(card)}>
              <Card
                sx={{
                  border: card === selectedCard ? "2px solid blue" : "1px solid lightgray",
                  backgroundColor: card === selectedCard ? "lightgray" : "white",
                  cursor: "pointer",
                }}
              >
                <ArgonBox py={1} px={2}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12}>
                      <ArgonTypography variant="h6">{card.name}</ArgonTypography>
                      <ArgonBadge
                        variant="contained"
                        color={card.badge}
                        badgeContent={card.status}
                        size="xs"
                        container
                      />
                    </Grid>
                  </Grid>
                </ArgonBox>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ArgonBox py={3}>
          <Grid container justifyContent="center" sx={{ height: "100%" }}>
            <Grid item xs={12} lg={8}>
              <Formik
                enableReinitialize
                initialValues={formInitialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  // Handle form submission
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form autoComplete="off">
                    <Card sx={{ height: "100%" }}>
                      <ArgonBox p={2}>
                        <ArgonBox>
                          <ArgonBox mt={2} width="100%">
                            <FormLabel>Name</FormLabel>
                            <Field
                              as={TextField}
                              name="name"
                              variant="outlined"
                              fullWidth
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </ArgonBox>
                          <ArgonBox mt={2} width="100%">
                            <FormControl fullWidth error={touched.url && Boolean(errors.url)}>
                              <FormLabel>URL</FormLabel>
                              <Field
                                as={TextField}
                                name="url"
                                variant="outlined"
                                fullWidth
                                helperText={touched.url && errors.url}
                              />
                            </FormControl>
                          </ArgonBox>
                          <ArgonBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                            <ArgonButton type="submit" color="info" size="small">
                              Update
                            </ArgonButton>
                          </ArgonBox>
                        </ArgonBox>
                      </ArgonBox>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </ArgonBox>
      </ArgonBox>

      <Dialog open={isModalOpen} onClose={handleModalClose} maxWidth="lg">
        <DialogTitle>Add New Camera</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Formik
            initialValues={{ name: '', url: '' }}
            validationSchema={validationSchema}
            onSubmit={handleNewCameraSubmit}
          >
            {({ errors, touched }) => (
              <Form autoComplete="off">
                <ArgonBox p={2}>
                  <ArgonBox mt={2} width="100%">
                    <FormLabel>Name</FormLabel>
                    <Field
                      as={TextField}
                      name="name"
                      variant="outlined"
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </ArgonBox>
                  <ArgonBox mt={2} width="100%">
                      <FormLabel>URL</FormLabel>
                      <Field
                        as={TextField}
                        name="url"
                        variant="outlined"
                        fullWidth
                        error={touched.url && Boolean(errors.url)}
                        helperText={touched.url && errors.url}
                      />
                  </ArgonBox>
                  <ArgonBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                    <ArgonButton type="submit" color="info" size="small">
                      Create
                    </ArgonButton>
                  </ArgonBox>
                </ArgonBox>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default TeamMembers;
