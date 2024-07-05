import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

function DefaultProjectCard({ image, label, title, description, action, authors }) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <ArgonAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,
          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
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
          }}
        />

        <ArgonBox
          position="absolute"
          top={0}
          right={0}
          p={0.25}
          bgcolor="rgba(0, 0, 0, 0.6)" // Background color for the title box
          borderRadius="0 12px 0 12px"
          zIndex="0" // Adjust as per your design
        >
          <ArgonTypography variant="body2" color="white">
            <ArgonBadge
              variant="contained"
              color={title === "Online" ? "success" : "error"}
              badgeContent={title}
              size="xs"
              container
            />
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>

      <ArgonBox pt={2} px={0.5} >
        <ArgonTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          textGradient
        >
          {label}
        </ArgonTypography>
        <ArgonBox pt={2} px={0.5} display="flex" gap="1rem">
          {action.map((button, index) => (
            <ArgonButton
              key={index}
              onClick={button.onClick}
              variant="outlined"
              size="small"
              color={button.color}
              fullWidth // Add fullWidth prop to make the button full-width
              sx={{
                backgroundColor: button.color === "info" ? "info" : "white", // Apply background color based on button.color
              }}          >
              {button.label}
            </ArgonButton>
          ))}
        </ArgonBox>
        {/* Optional: Displaying authors */}
        {/* <ArgonBox display="flex">{renderAuthors}</ArgonBox> */}
      </ArgonBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
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
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default DefaultProjectCard;
