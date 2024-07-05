import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArgonBox from "components/ArgonBox";
import ArgonDatePicker from "components/ArgonDatePicker";
import { makeStyles } from "@mui/styles";
import ArgonSelect from "components/ArgonSelect";
import { Padding } from "@mui/icons-material";

const useStyles = makeStyles({
  removeButton: {
    "&:hover": {
      backgroundColor: "rgb(17, 205, 239) !important",
      color: "#fff",
    },
  },
  // Adjust z-index as needed
  argonSelectDropdown: {
    zIndex: 999,
  
    
    },
    

});

function Header({
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
  handleClear,
  handleSubmit,
  ShowOrHideContainer,
  showOrHideSelectZoneType,
}) {
  const classes = useStyles();

  const zoneList = [
    { value: "Cash_Counter", label: "Cash_Counter" },
   
  ];

  const zoneDefaultValue = zoneList[0]; // Assuming you want the first item as default

  return (
    <ArgonBox position="relative">
      {ShowOrHideContainer && (
        <ArgonBox
          sx={{
            py: 2,
            px: 2,
            boxShadow: ({ boxShadows: { md } }) => md,
          }}
          style={{ backgroundColor: "#ffffff",borderRadius:"10px" }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <ArgonBox height="100%" mt={0.5} lineHeight={1}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <ArgonDatePicker
                      input={{ placeholder: "From Date" }}
                      value={fromDate}
                      onChange={handleFromDateChange}
                      options={{ maxDate: new Date() }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <ArgonDatePicker
                      input={{ placeholder: "To Date" }}
                      value={toDate}
                      onChange={handleToDateChange}
                      options={{ minDate: fromDate, maxDate: new Date() }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {showOrHideSelectZoneType &&
                    <ArgonSelect
                      className={classes.argonSelectDropdown} // Apply z-index here
                      defaultValue={{
                        value: zoneDefaultValue?.value,
                        label: zoneDefaultValue?.label,
                      }}
                      options={zoneList.map((value) => ({
                        value: value.value,
                        label: value.label,
                      }))}
                    />
                  }
                  </Grid>
                  <Grid item container xs={12} md={3} justifyContent="flex-end" spacing={2}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="white"
                        className={classes.removeButton}
                        onClick={handleClear}
                      >
                        Clear
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="white"
                        className={classes.removeButton}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </ArgonBox>
            </Grid>
          </Grid>
        </ArgonBox>
      )}
    </ArgonBox>
  );
}

// Define prop types for validation
Header.propTypes = {
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  handleFromDateChange: PropTypes.func.isRequired,
  handleToDateChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  ShowOrHideContainer: PropTypes.bool,
  showOrHideSelectZoneType: PropTypes.bool,
};

Header.defaultProps = {
  ShowOrHideContainer: true,
};

export default Header;
