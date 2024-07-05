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
import SampleImage from "./../../../../../assets/images/Sample.png";
import Subham from "./../../../../../assets/images/Subham.png";
import Saurav from "./../../../../../assets/images/Saurav.png";
import Santosh from "./../../../../../assets/images/Santosh.png";
import Amit from "./../../../../../assets/images/Amit.png";
import Kiran from "./../../../../../assets/images/Kiran.png";


import kiran1 from "assets/images/individual_persons/Kiran/cam1_1.png"
import kiran2 from "assets/images/individual_persons/Kiran/cam1_2.png"
import kiran3 from "assets/images/individual_persons/Kiran/cam2_1.png"
import kiran4 from "assets/images/individual_persons/Kiran/cam2_2.png"
import kiran5 from "assets/images/individual_persons/Kiran/cam4_1.png"


import Santosh1 from "assets/images/individual_persons/Santosh/cam1_1.png"
import Santosh2 from "assets/images/individual_persons/Santosh/cam1_2.png"
import Santosh3 from "assets/images/individual_persons/Santosh/cam2_1.png"
import Santosh4 from "assets/images/individual_persons/Santosh/cam2_2.png"
import Santosh5 from "assets/images/individual_persons/Santosh/cam3_1.png"
import Santosh6 from "assets/images/individual_persons/Santosh/cam3_2.png"
import Santosh7 from "assets/images/individual_persons/Santosh/cam4_1.png"

import Saurav1 from "assets/images/individual_persons/Saurav/cam1_1.png"
import Saurav2 from "assets/images/individual_persons/Saurav/cam1_2.png"
import Saurav3 from "assets/images/individual_persons/Saurav/cam2_1.png"
import Saurav4 from "assets/images/individual_persons/Saurav/cam2_2.png"
import Saurav5 from "assets/images/individual_persons/Saurav/cam3_1.png"
import Saurav6 from "assets/images/individual_persons/Saurav/cam3_2.png"
import Saurav7 from "assets/images/individual_persons/Saurav/cam4_1.png"

import Shubham1 from "assets/images/individual_persons/Shubham/cam1_1.png"
import Shubham2 from "assets/images/individual_persons/Shubham/cam1_2.png"
import Shubham3 from "assets/images/individual_persons/Shubham/cam2_1.png"
import Shubham4 from "assets/images/individual_persons/Shubham/cam2_2.png"
import Shubham5 from "assets/images/individual_persons/Shubham/cam3_1.png"
import Shubham6 from "assets/images/individual_persons/Shubham/cam3_2.png"
import Shubham7 from "assets/images/individual_persons/Shubham/cam4_1.png"

import Amit1 from "assets/images/individual_persons/Amit/cam1_1.png"
import Amit2 from "assets/images/individual_persons/Amit/cam3_1.png"
import Amit3 from "assets/images/individual_persons/Amit/cam3_2.png"
// Images

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
      Start_Time: "2024-06-28 17:14:35",
      End_Time: "2024-06-28 17:19:12",
      details: [
        {
          Start_Time: "2024-06-28T17:14:35.272593",
          End_Time: "2024-06-28T17:14:52.365285",
          Person_Id: 2,
          Cameras: "cam_1",
          id: 1,
          Image:kiran1
        },
        {
          Start_Time: "2024-06-28T17:15:31.075797",
          End_Time: "2024-06-28T17:15:52.748135",
          Person_Id: 2,
          Cameras: "cam_2",
          id: 2,
          Image:kiran3

        },
        {
          Start_Time: "2024-06-28T17:16:12.756415",
          End_Time: "2024-06-28T17:16:45.274711",
          Person_Id: 2,
          Cameras: "cam_4",
          id: 3,
          Image:kiran5

        },
        {
          Start_Time: "2024-06-28T17:17:13.202049",
          End_Time: "2024-06-28T17:17:37.785055",
          Person_Id: 2,
          Cameras: "cam_2",
          id: 4,
          Image:kiran4

        },
        {
          Start_Time: "2024-06-28T17:18:18.063401",
          End_Time: "2024-06-28T17:19:12.084218",
          Person_Id: 2,
          Cameras: "cam_1",
          id: 5,
          Image:kiran2

        }
      ],
      Image_Name:Kiran,
      Cameras: "cam_2,cam_1,cam_4",
      id: 1
    },
    {
      Person_Id: 5,
      Start_Time: "2024-06-28 17:15:14",
      End_Time: "2024-06-28 17:19:49",
      details: [
        {
          Start_Time: "2024-06-28T17:15:14.542361",
          End_Time: "2024-06-28T17:15:28.491203",
          Person_Id: 5,
          Cameras: "cam_1",
          id: 1,
          Image:Santosh1

        },
        {
          Start_Time: "2024-06-28T17:15:28.579230",
          End_Time: "2024-06-28T17:15:47.606435",
          Person_Id: 5,
          Cameras: "cam_3",
          id: 2,
          Image:Santosh5

        },
        {
          Start_Time: "2024-06-28T17:16:06.866573",
          End_Time: "2024-06-28T17:16:30.708875",
          Person_Id: 5,
          Cameras: "cam_2",
          id: 3,
          Image:Santosh3

        },
        {
          Start_Time: "2024-06-28T17:16:53.951813",
          End_Time: "2024-06-28T17:17:07.422325",
          Person_Id: 5,
          Cameras: "cam_4",
          id: 4,
          Image:Santosh7

        },
       
        {
          Start_Time: "2024-06-28T17:18:11.003027",
          End_Time: "2024-06-28T17:18:36.561363",
          Person_Id: 5,
          Cameras: "cam_2",
          id: 6,
          Image:Santosh4

        },
        {
          Start_Time: "2024-06-28T17:18:14.703867",
          End_Time: "2024-06-28T17:19:08.303380",
          Person_Id: 5,
          Cameras: "cam_3",
          id: 7,
          Image:Santosh6

        },
        {
          Start_Time: "2024-06-28T17:19:18.464462",
          End_Time: "2024-06-28T17:19:49.575067",
          Person_Id: 5,
          Cameras: "cam_1",
          id: 8,
          Image:Santosh2

        }
      ],
      Image_Name:Santosh,
      Cameras: "cam_3,cam_2,cam_1,cam_4",
      id: 2
    },
    {
      Person_Id: 9,
      Start_Time: "2024-06-28 17:15:58",
      End_Time: "2024-06-28 17:20:12",
      details: [
        {
          Start_Time: "2024-06-28T17:15:58.870415",
          End_Time: "2024-06-28T17:16:10.534587",
          Person_Id: 9,
          Cameras: "cam_1",
          id: 1,
          Image:Saurav1

        },
        {
          Start_Time: "2024-06-28T17:16:09.938397",
          End_Time: "2024-06-28T17:16:29.743203",
          Person_Id: 9,
          Cameras: "cam_3",
          id: 2,
          Image:Saurav5

        },
        {
          Start_Time: "2024-06-28T17:16:49.144431",
          End_Time: "2024-06-28T17:17:09.844208",
          Person_Id: 9,
          Cameras: "cam_2",
          id: 3,
          Image:Saurav3

        },
        {
          Start_Time: "2024-06-28T17:17:32.551148",
          End_Time: "2024-06-28T17:17:49.275342",
          Person_Id: 9,
          Cameras: "cam_4",
          id: 4,
          Image:Saurav7

        },
       
        {
          Start_Time: "2024-06-28T17:18:31.391352",
          End_Time: "2024-06-28T17:18:56.556041",
          Person_Id: 9,
          Cameras: "cam_2",
          id: 6,
          Image:Saurav4

        },
        {
          Start_Time: "2024-06-28T17:19:18.917823",
          End_Time: "2024-06-28T17:19:41.199047",
          Person_Id: 9,
          Cameras: "cam_3",
          id: 7,
          Image:Saurav6

        },
        {
          Start_Time: "2024-06-28T17:19:54.498726",
          End_Time: "2024-06-28T17:20:12.833932",
          Person_Id: 9,
          Cameras: "cam_1",
          id: 8,
          Image:Saurav2

        }
      ],
      Image_Name:Saurav,
      Cameras: "cam_3,cam_2,cam_1,cam_4",
      id: 3
    },
    {
      Person_Id: 13,
      Start_Time: "2024-06-28 17:16:33",
      End_Time: "2024-06-28 17:20:30",
      details: [
        {
          Start_Time: "2024-06-28T17:16:33.491714",
          End_Time: "2024-06-28T17:16:48.652476",
          Person_Id: 13,
          Cameras: "cam_1",
          id: 1,
          Image:Shubham1

        },
        {
          Start_Time: "2024-06-28T17:16:47.917576",
          End_Time: "2024-06-28T17:17:06.045416",
          Person_Id: 13,
          Cameras: "cam_3",
          id: 2,
          Image:Shubham5

        },
        {
          Start_Time: "2024-06-28T17:17:30.772933",
          End_Time: "2024-06-28T17:17:48.424393",
          Person_Id: 13,
          Cameras: "cam_2",
          id: 3,
          Image:Shubham3

        },
        {
          Start_Time: "2024-06-28T17:18:26.151976",
          End_Time: "2024-06-28T17:19:03.418197",
          Person_Id: 13,
          Cameras: "cam_4",
          id: 4,
          Image:Shubham7

        },
        {
          Start_Time: "2024-06-28T17:19:13.505482",
          End_Time: "2024-06-28T17:19:33.961466",
          Person_Id: 13,
          Cameras: "cam_2",
          id: 5,
          Image:Shubham4

        },
        {
          Start_Time: "2024-06-28T17:19:34.967184",
          End_Time: "2024-06-28T17:20:01.185142",
          Person_Id: 13,
          Cameras: "cam_3",
          id: 6,
          Image:Shubham6

        },
        {
          Start_Time: "2024-06-28T17:20:13.135840",
          End_Time: "2024-06-28T17:20:30.819704",
          Person_Id: 13,
          Cameras: "cam_1",
          id: 7,
          Image:Shubham2

        }
      ],
      Image_Name:Subham,
      Cameras: "cam_3,cam_2,cam_1,cam_4",
      id: 4
    },
    {
      Person_Id: 21,
      Start_Time: "2024-06-28 17:17:26",
      End_Time: "2024-06-28 17:20:37",
      details: [
        {
          Start_Time: "2024-06-28T17:17:26.043688",
          End_Time: "2024-06-28T17:17:52.066551",
          Person_Id: 21,
          Cameras: "cam_1",
          id: 1,
          Image:Amit1

        },
        {
          Start_Time: "2024-06-28T17:17:52.769339",
          End_Time: "2024-06-28T17:18:13.294541",
          Person_Id: 21,
          Cameras: "cam_3",
          id: 2,
          Image:Amit2

        },
        {
          Start_Time: "2024-06-28T17:20:21.409043",
          End_Time: "2024-06-28T17:20:37.852931",
          Person_Id: 21,
          Cameras: "cam_3",
          id: 3,
          Image:Amit3

        }
      ],
      Image_Name:Amit,
      Cameras: "cam_3,cam_1",
      id: 5
    }
  ]
};

export default tableData;
