import { useEffect, useState, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Example components for charts
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import PieChart from "examples/Charts/PieChart";

// Project-specific components
import Header from "layouts/pages/profile/components/Header";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { API_Url } from "utils/API";
import { useStore } from 'globalContext/GlobalContext';
import Table from "examples/Tables/Table";
import tableData from "layouts/pages/users/reports/data/tableData";
import ImageUrl from "assets/images/heatmap_overlay.png";


function Threshold() {

    const { columns, rows } = tableData;
    const [visitorData, setVisitorData] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [submittedDates, setSubmittedDates] = useState({ fromDate: null, toDate: null });
    const { selectedStore, token } = useStore();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Initial selected date

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
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

    const handleSubmit = () => {
        if (fromDate && toDate) {
            setSubmittedDates({ fromDate, toDate });
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


    useEffect(() => {
        const fetchData = async () => {
            try {

                let url = `${API_Url}/count_per_zone?store_id=${selectedStore}`;
                if (submittedDates.fromDate && submittedDates.toDate) {
                    const formattedFromDate = formatDate(submittedDates.fromDate);
                    const formattedToDate = formatDate(submittedDates.toDate);
                    url += `&from_date=${formattedFromDate}&to_date=${formattedToDate}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setVisitorData(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedStore, submittedDates]);


    const imageUrl = ImageUrl;






    useMemo(() => {
        console.log("Selected Store:", selectedStore);
    }, [selectedStore]);
    return (
        <DashboardLayout>
            <DashboardNavbar ShowOrHideTheSelectStoreInput={true} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Header
                        fromDate={fromDate}
                        toDate={toDate}
                        handleFromDateChange={handleFromDateChange}
                        handleToDateChange={handleToDateChange}
                        handleClear={handleClear}
                        handleSubmit={handleSubmit}
                        ShowOrHideContainer={false}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <ArgonBox mb={6}>
                        <div className="image-container">
                            <img
                            className="fireImg"
                                src={imageUrl}
                                alt="Description of your image"
                                style={{ maxWidth: '100%', height: '80vh', width: '100%', display: 'block', objectFit: 'contain' }}
                            />
                        </div>

                    </ArgonBox>
                </Grid>
                <Grid item xs={12} md={12}>
                    <ArgonBox mb={6}>
                        <Table columns={columns} rows={rows} title="Track Path Data" />
                    </ArgonBox>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default Threshold