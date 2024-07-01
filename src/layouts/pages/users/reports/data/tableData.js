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

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonBadgeDot from "components/ArgonBadgeDot";
import SampleImage from "./../../../../../assets/images/Sample.png"
// Images
const team1 ="https://images.unsplash.com/photo-1719401542081-5f007eaabfee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8";
const team2 = "https://images.unsplash.com/photo-1719465580670-7f2ff4a4029f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D";
const team3 = "https://images.unsplash.com/photo-1719216323699-79e62fbc6a56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D";

const Sample=SampleImage;
const tableData = {
  columns: [
    { name: "Person_Id", align: "center" },
    { name: "Start_Time", align: "center" },
    { name: "End_Time", align: "center" },
    { name: "Cameras", align: "center" },
  ],

  rows:[
    {
      Person_Id: 2,
      Start_Time: "2024-06-28T17:14:35.272593",
      End_Time: "2024-06-28T17:19:12.084218",
      details: [
        {
          Start_Time: "2024-06-28T17:14:35.272593",
          End_Time: "2024-06-28T17:14:52.365285",
          Person_Id: 2,
          Cameras: "cam_1",
          id: 1
        },
        {
          Start_Time: "2024-06-28T17:15:31.075797",
          End_Time: "2024-06-28T17:15:52.748135",
          Person_Id: 2,
          Cameras: "cam_2",
          id: 2
        },
        {
          Start_Time: "2024-06-28T17:16:12.756415",
          End_Time: "2024-06-28T17:16:45.274711",
          Person_Id: 2,
          Cameras: "cam_4",
          id: 3
        },
        {
          Start_Time: "2024-06-28T17:17:13.202049",
          End_Time: "2024-06-28T17:17:37.785055",
          Person_Id: 2,
          Cameras: "cam_2",
          id: 4
        },
        {
          Start_Time: "2024-06-28T17:18:18.063401",
          End_Time: "2024-06-28T17:19:12.084218",
          Person_Id: 2,
          Cameras: "cam_1",
          id: 5
        }
      ],
      Image_Name:Sample,
      Cameras: "cam_2,cam_1,cam_4",
      id: 1
    },
    {
      Person_Id: 5,
      Start_Time: "2024-06-28T17:15:14.542361",
      End_Time: "2024-06-28T17:19:49.575067",
      details: [
        {
          Start_Time: "2024-06-28T17:15:14.542361",
          End_Time: "2024-06-28T17:15:28.491203",
          Person_Id: 5,
          Cameras: "cam_1",
          id: 1
        },
        {
          Start_Time: "2024-06-28T17:15:28.579230",
          End_Time: "2024-06-28T17:15:47.606435",
          Person_Id: 5,
          Cameras: "cam_3",
          id: 2
        },
        {
          Start_Time: "2024-06-28T17:16:06.866573",
          End_Time: "2024-06-28T17:16:30.708875",
          Person_Id: 5,
          Cameras: "cam_2",
          id: 3
        },
        {
          Start_Time: "2024-06-28T17:16:53.951813",
          End_Time: "2024-06-28T17:17:07.422325",
          Person_Id: 5,
          Cameras: "cam_4",
          id: 4
        },
        {
          Start_Time: "2024-06-28T17:17:07.907258",
          End_Time: "2024-06-28T17:17:39.054959",
          Person_Id: 5,
          Cameras: "cam_4",
          id: 5
        },
        {
          Start_Time: "2024-06-28T17:18:11.003027",
          End_Time: "2024-06-28T17:18:36.561363",
          Person_Id: 5,
          Cameras: "cam_2",
          id: 6
        },
        {
          Start_Time: "2024-06-28T17:18:14.703867",
          End_Time: "2024-06-28T17:19:08.303380",
          Person_Id: 5,
          Cameras: "cam_3",
          id: 7
        },
        {
          Start_Time: "2024-06-28T17:19:18.464462",
          End_Time: "2024-06-28T17:19:49.575067",
          Person_Id: 5,
          Cameras: "cam_1",
          id: 8
        }
      ],
      Image_Name:Sample,
      Cameras: "cam_3,cam_2,cam_1,cam_4",
      id: 2
    },
    {
      Person_Id: 9,
      Start_Time: "2024-06-28T17:15:58.870415",
      End_Time: "2024-06-28T17:20:12.833932",
      details: [
        {
          Start_Time: "2024-06-28T17:15:58.870415",
          End_Time: "2024-06-28T17:16:10.534587",
          Person_Id: 9,
          Cameras: "cam_1",
          id: 1
        },
        {
          Start_Time: "2024-06-28T17:16:09.938397",
          End_Time: "2024-06-28T17:16:29.743203",
          Person_Id: 9,
          Cameras: "cam_3",
          id: 2
        },
        {
          Start_Time: "2024-06-28T17:16:49.144431",
          End_Time: "2024-06-28T17:17:09.844208",
          Person_Id: 9,
          Cameras: "cam_2",
          id: 3
        },
        {
          Start_Time: "2024-06-28T17:17:32.551148",
          End_Time: "2024-06-28T17:17:49.275342",
          Person_Id: 9,
          Cameras: "cam_4",
          id: 4
        },
        {
          Start_Time: "2024-06-28T17:17:49.834388",
          End_Time: "2024-06-28T17:18:08.551185",
          Person_Id: 9,
          Cameras: "cam_4",
          id: 5
        },
        {
          Start_Time: "2024-06-28T17:18:31.391352",
          End_Time: "2024-06-28T17:18:56.556041",
          Person_Id: 9,
          Cameras: "cam_2",
          id: 6
        },
        {
          Start_Time: "2024-06-28T17:19:18.917823",
          End_Time: "2024-06-28T17:19:41.199047",
          Person_Id: 9,
          Cameras: "cam_3",
          id: 7
        },
        {
          Start_Time: "2024-06-28T17:19:54.498726",
          End_Time: "2024-06-28T17:20:12.833932",
          Person_Id: 9,
          Cameras: "cam_1",
          id: 8
        }
      ],
      Image_Name:Sample,
      Cameras: "cam_3,cam_2,cam_1,cam_4",
      id: 3
    },
    {
      Person_Id: 13,
      Start_Time: "2024-06-28T17:16:33.491714",
      End_Time: "2024-06-28T17:20:30.819704",
      details: [
        {
          Start_Time: "2024-06-28T17:16:33.491714",
          End_Time: "2024-06-28T17:16:48.652476",
          Person_Id: 13,
          Cameras: "cam_1",
          id: 1
        },
        {
          Start_Time: "2024-06-28T17:16:47.917576",
          End_Time: "2024-06-28T17:17:06.045416",
          Person_Id: 13,
          Cameras: "cam_3",
          id: 2
        },
        {
          Start_Time: "2024-06-28T17:17:30.772933",
          End_Time: "2024-06-28T17:17:48.424393",
          Person_Id: 13,
          Cameras: "cam_2",
          id: 3
        },
        {
          Start_Time: "2024-06-28T17:18:26.151976",
          End_Time: "2024-06-28T17:19:03.418197",
          Person_Id: 13,
          Cameras: "cam_4",
          id: 4
        },
        {
          Start_Time: "2024-06-28T17:19:13.505482",
          End_Time: "2024-06-28T17:19:33.961466",
          Person_Id: 13,
          Cameras: "cam_2",
          id: 5
        },
        {
          Start_Time: "2024-06-28T17:19:34.967184",
          End_Time: "2024-06-28T17:20:01.185142",
          Person_Id: 13,
          Cameras: "cam_3",
          id: 6
        },
        {
          Start_Time: "2024-06-28T17:20:13.135840",
          End_Time: "2024-06-28T17:20:30.819704",
          Person_Id: 13,
          Cameras: "cam_1",
          id: 7
        }
      ],
      Image_Name:Sample,
      Cameras: "cam_3,cam_2,cam_1,cam_4",
      id: 4
    },
    {
      Person_Id: 21,
      Start_Time: "2024-06-28T17:17:26.043688",
      End_Time: "2024-06-28T17:20:37.852931",
      details: [
        {
          Start_Time: "2024-06-28T17:17:26.043688",
          End_Time: "2024-06-28T17:17:52.066551",
          Person_Id: 21,
          Cameras: "cam_1",
          id: 1
        },
        {
          Start_Time: "2024-06-28T17:17:52.769339",
          End_Time: "2024-06-28T17:18:13.294541",
          Person_Id: 21,
          Cameras: "cam_3",
          id: 2
        },
        {
          Start_Time: "2024-06-28T17:20:21.409043",
          End_Time: "2024-06-28T17:20:37.852931",
          Person_Id: 21,
          Cameras: "cam_3",
          id: 3
        }
      ],
      Image_Name:Sample,
      Cameras: "cam_3,cam_1",
      id: 5
    }
  ]
};

export default tableData;
