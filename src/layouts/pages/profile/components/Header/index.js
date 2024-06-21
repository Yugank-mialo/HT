import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArgonBox from "components/ArgonBox";
import ArgonDatePicker from "components/ArgonDatePicker";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  removeButton: {
    "&:hover": {
      backgroundColor: "rgb(17, 205, 239) !important",
      color: "#fff",
    },
  },
});

function Header({
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
  handleClear,
  handleSubmit,
}) {
  const classes = useStyles();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleFromDateChange = (date) => {
    setFromDate(formatDate(date));
    if (toDate && date && date > toDate) {
      setToDate(null); // Reset toDate if it's before fromDate
    }
  };

  const handleToDateChange = (date) => {
    setToDate(formatDate(date));
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
  };

  const handleSubmit = () => {
    if (fromDate && toDate) {
      const formattedFromDate = formatDate(fromDate);
      const formattedToDate = formatDate(toDate);
      console.log("From Date:", formattedFromDate);
      console.log("To Date:", formattedToDate);
      // Add your submit logic here
    }
  };

  const formatDate = (date1) => {
    const date = new Date(date1);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-indexed, hence +1
    const day = ("0" + date.getDate()).slice(-2);

    // Form the yyyy-mm-dd format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return (
    <ArgonBox position="relative">
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
        style={{ backgroundColor: "#ffffff" }}
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
                    options={{ maxDate: toDate }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ArgonDatePicker
                    input={{ placeholder: "To Date" }}
                    value={toDate}
                    onChange={handleToDateChange}
                    options={{ minDate: fromDate }}
                  />
                </Grid>
                <Grid item container xs={12} md={6} justifyContent="flex-end" spacing={2}>
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
      </Card>
    </ArgonBox>
  );
}

Header.propTypes = {
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  handleFromDateChange: PropTypes.func.isRequired,
  handleToDateChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Header;
