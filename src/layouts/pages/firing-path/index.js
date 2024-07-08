import { useEffect, useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Header from "layouts/pages/profile/components/Header";
import { API_Url } from "utils/API";
import { useStore } from 'globalContext/GlobalContext';
import DataTable from "examples/Tables/TrackPathTable/TrackPathDataTable";
import ImageUrlValue from "./../../../assets/images/settingImages/placeholderImage.png";
import { toast } from "react-toastify";
// import Table from "examples/Tables/Table";
// import tableData from "layouts/pages/users/reports/data/tableData"
function FiringPath() {
    // const { columns, rows } = tableData;

    const [visitorData, setVisitorData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [submittedDates, setSubmittedDates] = useState({ fromDate: null, toDate: null });
    const { selectedStore } = useStore();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

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
        if (!fromDate || !toDate) {
            toast.error("Both from date and to date should be selected", {
                autoClose: 1000, // duration in milliseconds
            });
            return; // Early return if either date is null
        }

        setSubmittedDates({ fromDate, toDate });
    };

    const formatDate = (date1) => {
        const date = new Date(date1);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const convertDateFormat = (inputDateString) => {
        const date = new Date(inputDateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = `${API_Url}/reid_logs`;
                if (submittedDates.fromDate && submittedDates.toDate) {
                    url += `?from_date=${submittedDates.fromDate}&to_date=${submittedDates.toDate}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    setImageUrl(null);
                    throw new Error("Network response was not ok");

                }
                const data = await response.json();
                if (data.message == "Unsuccessful" || data.status == 0) {
                    setImageUrl(null);
                    setVisitorData({
                        columns: [
                            { Header: "Person Id", accessor: "Person_Id", width: "10%" },
                            { Header: "Start Time", accessor: "Start_Time", width: "20%" },
                            { Header: "End Time", accessor: "End_Time", width: "20%" },
                            { Header: "Cameras", accessor: "Cameras", width: "10%" },
                        ],
                        rows: []
                    });
                } else {
                    setImageUrl(data.image_path);
                    setVisitorData({
                        columns: [
                            { Header: "Person Id", accessor: "Person_Id", width: "10%" },
                            { Header: "Start Time", accessor: "Start_Time", width: "20%" },
                            { Header: "End Time", accessor: "End_Time", width: "20%" },
                            { Header: "Cameras", accessor: "Cameras", width: "10%" },
                        ],
                        rows: data.data.map(item => ({
                            ...item,
                            Start_Time: convertDateFormat(item.Start_Time),
                            End_Time: convertDateFormat(item.End_Time),
                        })),
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setImageUrl(null);

            }
        };

        fetchData();
    }, [selectedStore, submittedDates]);

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
                    {/* src={`${API_Url}/img/${imageUrl}`} */}

                    <ArgonBox mb={6}>
                        <div className="image-container">
                            <img
                                className="fireImg"
                                src={imageUrl ? `${API_Url}/img/${imageUrl}` : ImageUrlValue}
                                alt="Description of your image"
                                style={{ maxWidth: '100%', height: 'auto', width: '100%', display: 'block', objectFit: 'contain' }}
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
                        <ArgonBox pt={2} pr={2} pb={0} pl={2} lineHeight={1}>
                            <ArgonTypography variant="h5" fontWeight="medium">
                                Track Path Table
                            </ArgonTypography>
                        </ArgonBox>
                        {visitorData ? (
                            <DataTable table={visitorData} canSearch fromDate={submittedDates.fromDate} toDate={submittedDates.toDate} />
                        ) : (
                            <ArgonBox p={2}>
                                <ArgonTypography>Loading data...</ArgonTypography>
                            </ArgonBox>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default FiringPath;
