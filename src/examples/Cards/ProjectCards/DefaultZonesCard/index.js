import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton"; // Import your ArgonButton component

function DefaultZonesCard({ image, label, title, description, action, authors, label1 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoneName, setZoneName] = useState(null);

  const openModal = (image, label1) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setZoneName(label1);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "aliceblue",
        boxShadow: "none",
        overflow: "visible",
        padding: "10px",
      }}
    >
      <ArgonBox position="relative" width="100.25%" shadow="md" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer",
          }}
          onClick={() => openModal(image, label1)}
        />
      </ArgonBox>
      <ArgonBox sx={{ textAlign: "center", padding: "2px" }}>
        <ArgonTypography variant="button" fontWeight="regular" textTransform="capitalize" textGradient>
          Zone Name&nbsp;:&nbsp;&nbsp; {label1}
        </ArgonTypography>
      </ArgonBox>

      {/* Edit and Delete Buttons */}
      <ArgonBox pt={2} px={0.5} display="flex" gap="1rem">
        {action.map((button, index) => (
          <ArgonButton
          key={index}
          variant="outlined"
          size="small"
          color={button.color}
          fullWidth // Add fullWidth prop to make the button full-width
          sx={{
            backgroundColor: button.color == "info" ? "info":"white", // Apply background color based on button.color
          }}          >
          {button.label}
        </ArgonButton>
          
        ))}
      </ArgonBox>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="md">
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div">{zoneName}</Typography>
            <IconButton onClick={closeModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt={title}
            style={{
              maxWidth: "100%",
              objectFit: "contain",
              margin: "auto",
              display: "block",
            }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// Setting default values for the props of DefaultZonesCard
DefaultZonesCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultZonesCard
DefaultZonesCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label1: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["internal", "external"]).isRequired,
      route: PropTypes.string,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
        "white",
      ]).isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired, // Add onClick validation for each action
    })
  ).isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default DefaultZonesCard;
