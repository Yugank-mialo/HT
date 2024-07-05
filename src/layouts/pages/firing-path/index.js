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
// import tableData from "layouts/pages/users/reports/data/tableData";
import ImageUrl from "./../../../assets/images/heatmap_overlay.png"
import DataTable from "examples/Tables/TrackPathTable/TrackPathDataTable";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";


const tableData = {
    columns: [
        { Header: "Person Id", accessor: "Person_Id", width: "10%" },
        { Header: "Start Time", accessor: "Start_Time", width: "20%" },
        { Header: "End Time", accessor: "End_Time", width: "20%" },
        { Header: "Cameras", accessor: "Cameras", width: "10%" },
    ],

    rows: [
        {
            Start_Time: "4/6/2024 11:59 AM",
            End_Time: "4/6/2024 12:02 PM",
            Person_Id: 1,
            Cameras: "cam_3,cam_1",
        },
        {
            Start_Time: "8/6/2024 10:54 AM",
            End_Time: "8/6/2024 11:05 PM",
            Person_Id: 2,
            Cameras: "cam_3,cam_1",
        },
        {
            Start_Time: "11/6/2024 3:11 PM",
            End_Time: "11/6/2024 3:19 PM",
            Person_Id: 3,
            Cameras: "cam_3,cam_1",
        },
        {
            Start_Time: "12/6/2024 9:57 AM",
            End_Time: "12/6/2024 10:02 AM",
            Person_Id: 4,
            Cameras: "cam_3,cam_1"
        },
        {
            Start_Time: "14/6/2024 5:59 PM",
            End_Time: "14/6/2024 6:05 PM",
            Person_Id: 5,
            Cameras: "cam_3,cam_1"
        },

    ],
};



function FiringPath() {
    // const { columns, rows } = tableData;
    const [visitorData, setVisitorData] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [submittedDates, setSubmittedDates] = useState({ fromDate: null, toDate: null });
    const { selectedStore, token } = useStore();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Initial selected date
    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };
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
                        ShowOrHideContainer={true}
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
                {/* <Grid item xs={12} md={12}>
                    <ArgonBox mb={6}>
                        <Table columns={columns} rows={rows} title="Track Path Data" />
                    </ArgonBox>
                </Grid> */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <ArgonBox p={3} lineHeight={1}>
                            <ArgonTypography variant="h5" fontWeight="medium">
                                Track Path Table         
                                   </ArgonTypography>
                        </ArgonBox>
                        <DataTable table={tableData} />
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default FiringPath;