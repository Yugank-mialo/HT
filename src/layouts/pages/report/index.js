import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Header from "layouts/pages/profile/components/Header";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useStore } from 'globalContext/GlobalContext';
import { API_Url } from "utils/API";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ArgonBox from "components/ArgonBox";
import ArgonDatePicker from "components/ArgonDatePicker";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    removeButton: {
        '&:hover': {
            backgroundColor: 'rgb(17, 205, 239) !important',
            color: '#fff',
        },
    },
});

function Report() {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [submittedDates, setSubmittedDates] = useState({ fromDate: null, toDate: null });
    const { selectedStore, token } = useStore();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleFromDateChange = (date) => {
        setFromDate(formatDate(date));
        if (toDate && date && date > toDate) {
            setToDate(null);
        }
    };

    const handleToDateChange = (date) => {
        setToDate(formatDate(date));
    };

    const handleClear = () => {
        setFromDate(null);
        setToDate(null);
        setSubmittedDates({ fromDate: null, toDate: null });
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!selectedStore) {
            setLoading(false);
            toast.warning("Please select a store.", {
                style: { whiteSpace: "nowrap", width: "auto" }
            });
            return;
        }

        let apiUrl = `${API_Url}/report?store_id=${selectedStore}`;

        if (fromDate) {
            apiUrl += `&from_date=${fromDate}`;
        }

        if (toDate) {
            apiUrl += `&to_date=${toDate}`;
        }

        try {
            const response = await axios.get(apiUrl);
            if (response.data?.status) {
                const url = `${API_Url}/${response.data.file}`;
                const anchor = document.createElement('a');
                anchor.download = response.data.file;
                anchor.href = url;
                anchor.click();
                toast.success("Report downloaded successfully.", {
                    autoClose: 1000,
                    style: { whiteSpace: "nowrap", width: "auto" },
                });
                setFromDate(null);
                setToDate(null);
                setLoading(false);

            } else {
                toast.error("Failed to download report.", {
                    autoClose: 1000,
                    style: { whiteSpace: "nowrap", width: "auto" },
                })
                setLoading(false);

            }
        } catch (error) {
            toast.error("Failed to download report.", {
                autoClose: 1000,
                style: { whiteSpace: "nowrap", width: "auto" },
            })
            setLoading(false);
        }
    };

    const formatDate = (date1) => {
        const date = new Date(date1);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <Grid item xs={12} md={12} sx={{
                marginTop: {
                    xs: '8vh',
                    sm: '4vh',
                    md: '4vh',
                },
            }}>
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
                                        <Grid item container xs={12} md={6} justifyContent="flex-end" spacing={2}>
                                            <Grid item>
                                                <Button variant="contained" color="white" className={classes.removeButton} onClick={handleClear}>
                                                    Clear
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                {loading ? <Button variant="contained" color="white" className={classes.removeButton}>
                                                    Loading ...
                                                </Button> : <Button variant="contained" color="white" className={classes.removeButton} onClick={handleSubmit}>
                                                    Download Report
                                                </Button>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ArgonBox>
                            </Grid>
                        </Grid>

                    </Card>

                </ArgonBox>
            </Grid>
        </DashboardLayout>
    );
}

export default Report;
