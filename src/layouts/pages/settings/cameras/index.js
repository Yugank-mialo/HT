import React, { useState } from "react";
import {
    Grid,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    FormLabel,
    IconButton,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

import homeDecor1 from "assets/images/settingImages/Reception.png";
import homeDecor2 from "assets/images/settingImages/HallWay.png";
import homeDecor3 from "assets/images/settingImages/LabArea.png";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    url: Yup.string().url("Invalid URL format").required("URL is required"),
});

const initialCameraData = [
    {
        image: homeDecor1,
        label: "Reception",
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
        label: "Hallway",
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
        label: "Lab area",
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

function Cameras() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [cameraData, setCameraData] = useState(initialCameraData);

    const handleEditCamera = (camera) => {
        setSelectedCamera(camera);
        setIsModalOpen(true);
    };

    const handleDeleteCamera = (id) => {
        console.log(id)
    }

    const handleAddCamera = () => {
        setSelectedCamera(null);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCamera(null);
    };

    const handleFormSubmit = (values) => {
        if (selectedCamera) {
            // Editing existing camera
            const updatedData = cameraData.map((camera) =>
                camera.label === selectedCamera.label ? { ...camera, label: values.name, url: values.url } : camera
            );
            setCameraData(updatedData);
        } else {
            // Adding new camera
            const newCamera = {
                image: homeDecor1,
                label: values.name,
                title: "Online",
                url: values.url,
                description: "New camera added.",
                authors: [
                    { image: team1, name: "New Author" },
                    { image: team2, name: "New Author" },
                ],
            };
            setCameraData([...cameraData, newCamera]);
        }
        handleModalClose();
    };

    return (
        <DashboardLayout>
            <DashboardNavbar ShowOrHideTheSelectStoreInput={true} />
            <Grid container spacing={3} my={6}>
                <Grid item xs={12} md={12} lg={12}>
                    <ArgonBox mb={3}>
                        <Card>
                            <ArgonBox pt={2} px={2}>
                                <ArgonBox mb={0.5}>
                                    <ArgonTypography variant="h5" fontWeight="medium">
                                        Cameras
                                    </ArgonTypography>
                                </ArgonBox>
                            </ArgonBox>
                            <ArgonBox p={2}>
                                <Grid container spacing={3}>
                                    {cameraData.map((camera, index) => (
                                        <Grid item xs={12} md={6} xl={3} key={index}>
                                            <DefaultProjectCard
                                                image={camera.image}
                                                label={camera.label}
                                                title={camera.title}
                                                description={camera.description}
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
                                            />

                                        </Grid>
                                    ))}
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        xl={3}
                                        onClick={handleAddCamera}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <PlaceholderCard
                                            title={{ variant: "h5", text: "Add New Cameras" }}
                                            outlined
                                        />
                                    </Grid>

                                </Grid>
                            </ArgonBox>
                        </Card>
                    </ArgonBox>
                </Grid>
            </Grid>

            <Dialog open={isModalOpen} onClose={handleModalClose} maxWidth="lg" fullWidth={true}>
                <DialogTitle sx={{ padding: "16px 24px 0px !important" }}>
                    {selectedCamera ? "Edit Camera" : "Add New Camera"}
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
                        initialValues={{ name: selectedCamera?.label || "", url: selectedCamera?.url || "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <ArgonBox p={2}>
                                    <ArgonBox mt={2} width="100%" sx={{ display: "flex" }}>
                                        <FormLabel sx={{ width: "15%", fontSize: "0.75rem", fontWeight: "700" }}>Name</FormLabel>
                                        <Field
                                            as={TextField}
                                            name="name"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </ArgonBox>
                                    <ArgonBox mt={2} width="100%" sx={{ display: "flex" }}>
                                        <FormLabel sx={{ width: "15%", fontSize: "0.75rem", fontWeight: "700" }}>RTSP URL</FormLabel>
                                        <Field
                                            as={TextField}
                                            name="url"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.url && Boolean(errors.url)}
                                            helperText={touched.url && errors.url}
                                        />
                                    </ArgonBox>
                                    <ArgonBox mt={2} width="100%">
                                        <img
                                            src={homeDecor1}
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
                                        {selectedCamera ? "Update" : "Add"}
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

export default Cameras;
