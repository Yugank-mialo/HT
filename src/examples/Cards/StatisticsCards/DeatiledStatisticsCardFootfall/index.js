/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI contexts
import { useArgonController } from "context";

function DetailedStaticsCardFootfall({ bgColor, title, count, percentage, icon, direction }) {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <Card>
      <ArgonBox
        bgColor={bgColor === "white" && darkMode ? "transparent" : bgColor}
        variant={bgColor === "white" && darkMode ? "contained" : "gradient"}
      >
        <ArgonBox p={2}>
          <Grid container>
            {/* {direction === "left" ? (
              <Grid item>
                <ArgonBox
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  borderRadius="section"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {typeof icon.component === "string" ? (
                    <Icon fontSize="small" color="inherit">
                      {icon.component}
                    </Icon>
                  ) : (
                    <ArgonBox
                      fontSize="1.125rem"
                      display="grid"
                      placeItems="center"
                      color="inherit"
                    >
                      {icon.component}
                    </ArgonBox>
                  )}
                </ArgonBox>
              </Grid>
            ) : null} */}
            <Grid item xs={12} >
              <ArgonBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <ArgonTypography
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize="1.1rem"
                >
                  {title}
                </ArgonTypography>
                <ArgonTypography
                
                    variant="h6"
                    color="#8392ab !important"
                    textTransform="uppercase"
                    style={{whiteSpace:"nowrap",color:"#8392ab"}}
                >
                  {count}
                </ArgonTypography>
              </ArgonBox>
            </Grid>
            {/* {direction === "right" ? (
              <Grid item xs={4}>
                <ArgonBox
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  borderRadius="section"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  ml="auto"
                >
                  {typeof icon.component === "string" ? (
                    <Icon fontSize="small" color="inherit">
                      {icon.component}
                    </Icon>
                  ) : (
                    <ArgonBox
                      fontSize="1.125rem"
                      display="grid"
                      placeItems="center"
                      color="inherit"
                    >
                      {icon.component}
                    </ArgonBox>
                  )}
                </ArgonBox>
              </Grid>
            ) : null} */}
          </Grid>
          {/* <ArgonTypography
            display="flex"
            alignItems="center"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.count}
            <ArgonTypography
              variant="body2"
              fontWeight="regular"
              color={bgColor === "white" ? "text" : "white"}
              ml={0.5}
              mt={-0.125}
            >
              {percentage.text}
            </ArgonTypography>
          </ArgonTypography> */}
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

// Setting default values for the props of DetailedStaticsCardFootfall
DetailedStaticsCardFootfall.defaultProps = {
  bgColor: "white",
  percentage: {
    color: "success",
    count: 0,
    text: "",
  },
  direction: "right",
};

// Typechecking props for the DetailedStaticsCardFootfall
DetailedStaticsCardFootfall.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default DetailedStaticsCardFootfall;