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
import saurav from "assets/images/SauravLowes.jpg" 
import saurav1 from "assets/images/Sauravlowes1.jpg" 
import thusar from "assets/images/Tushar.jpg" 
import shubham from "assets/images/ShubhamLowes.jpg" 
import santosh from "assets/images/SantoshLowes.jpg" 

const dataTableData = {
  columns: [
    { Header: "Id", accessor: "id", width: "10%" },
    { Header: "Entry Time", accessor: "entry_time", width: "20%" },
    { Header: "Exit Time", accessor: "exit_time" ,width:"20%"},
    { Header: "duration", accessor: "duration", width: "10%" },
    { Header: "Image", accessor: "image",width:"20%" },
  ],

  rows: [
    {
      id:1,
      entry_time:"4/6/2024 11:59 AM",
      exit_time:"4/6/2024 12:02 PM",
      duration:"3 min",
      image:saurav,
    },
    {
      id:2,
      entry_time:"8/6/2024 10:54 AM",
      exit_time:"8/6/2024 11:05 PM",
      duration:"11 min",
      image:santosh,
    },
    {
      id:3,
      entry_time:"11/6/2024 3:11 PM",
      exit_time:"11/6/2024 3:19 PM",
      duration:"8 min",
      image:thusar,
    },
    {
      id:4,
      entry_time:"12/6/2024 9:57 AM",
      exit_time:"12/6/2024 10:02 AM",
      duration:"5 min",
      image:shubham,
    },
    {
      id:5,
      entry_time:"14/6/2024 5:59 PM",
      exit_time:"14/6/2024 6:05 PM",
      duration:"6 min",
      image:saurav1,
    },

  ],
};

export default dataTableData;
