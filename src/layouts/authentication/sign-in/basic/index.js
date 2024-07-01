import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import { Alert, InputLabel } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import logoCT from "assets/images/reatialsense_logo.jpg";
import { API_Url } from "utils/API";
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_Url}/loginCheck`, {
        username: email,
        password: password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAlertType("success");
        setAlertMessage("Login successful!");
        // Redirect or perform other actions here
        navigate("/dashboard"); // example redirect after successful login
      } else {
        setAlertMessage("Invalid response from server.");
      }
    } catch (error) {
      setAlertMessage("Login failed. Please check your credentials.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <ArgonBox p={3} textAlign="center">
          <ArgonBox component="img" src={logoCT} width="75%" p={1} mb={1} />
          <ArgonTypography variant="h5" fontWeight="medium" sx={{ my: 0 }}>
            Welcome to Retailsense
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox px={6} pb={3} textAlign="center">
          <ArgonBox component="form" role="form">
            {alertMessage && (
              <Alert severity={alertType} sx={{ mb: 2 }}>
                {alertMessage}
              </Alert>
            )}
            <ArgonBox mb={2}>
              <InputLabel
                shrink
                sx={{ textAlign: "left", fontWeight: 900 }}
                color="dark"
                fontWeight="700"
                htmlFor="email"
              >
                Username
              </InputLabel>
              <ArgonInput
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
                type="email"
                placeholder="Email"
                onKeyDown={handleKeyDown}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <InputLabel
                shrink
                sx={{ textAlign: "left", fontWeight: 900 }}
                color="dark"
                fontWeight="700"
                htmlFor="Password"
              >
                Password
              </InputLabel>
              <ArgonInput
                name="password"
                id="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                onKeyDown={handleKeyDown}
              />
            </ArgonBox>
            {/* <ArgonBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </ArgonTypography>
            </ArgonBox> */}
            <ArgonBox mt={4} mb={1}>
              <ArgonButton color="info" fullWidth onClick={handleSubmit}>
                Login
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;