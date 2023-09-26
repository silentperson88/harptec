import { useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bgLogin.jpg";
// import logo from "assets/images/loginLogo.png";
import { InputAdornment, IconButton, InputLabel } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import pxToRem from "assets/theme/functions/pxToRem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// Validations Rules
import Validations from "utils/Validations/index";

// Sessions
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Sessions from "utils/Sessions";
import { defaultData } from "utils/Constants";

function Basic() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleValidation = () => {
    const emailValidate = Validations.validate("email", email, null, null, true);
    const passwordValidate = Validations.validate("password", password, 6, 30, true);
    console.log(emailValidate, passwordValidate, email, password);
    if (emailValidate !== "" || passwordValidate !== "") {
      setEmailError(emailValidate);
      setPasswordError(passwordValidate);
      return false;
    }
    return true;
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    const val = handleValidation();
    console.log(val);
    if (val) {
      if (email === defaultData.EMAIL && password === defaultData.PASSWORD) {
        if (email !== "") {
          Sessions.setUserEmail(email);
        }

        navigate("/home");
      } else {
        setCredentialError("Invalid Credentials");
      }
    }
    setLoading(false);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <MDBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Card
          sx={{
            width: pxToRem(450),
            backgroundColor: "#eceff7",
          }}
        >
          <MDBox display="flex" alignItems="center" justifyContent="center">
            <MDBox
              sx={{
                marginTop: pxToRem(42),
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <MDTypography variant="h6" fontWeight="bold">
                Harptec
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDTypography textAlign="center" color="error" mt={1}>
            {credentialError !== "" ? credentialError : null}
          </MDTypography>
          <MDBox display="flex" alignItems="center" justifyContent="center">
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <InputLabel
                    sx={{
                      fontSize: pxToRem(16),
                      fontWeight: 600,
                      color: "#344054",
                      marginBottom: 1,
                    }}
                  >
                    Email
                  </InputLabel>
                  <MDInput
                    sx={{
                      width: pxToRem(320),
                      backgroundColor: "#fff",
                      "& input": {
                        fontSize: "16px",
                        color: "#667085",
                      },
                    }}
                    type="email"
                    placeholder="Enter Your Email Here"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon fontSize="medium" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleEmailChange}
                    onKeyDown={handleKeyDown}
                  />
                  <MDTypography variant="caption" color="error" display="flex" mt={1}>
                    {emailError}
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <InputLabel
                    sx={{
                      fontSize: pxToRem(16),
                      fontWeight: 600,
                      color: "#344054",
                      marginBottom: 1,
                    }}
                  >
                    Password
                  </InputLabel>
                  <MDInput
                    sx={{
                      width: pxToRem(320),
                      backgroundColor: "#fff",
                      borderRadius: 0,
                      "& input": {
                        fontSize: "16px",
                        color: "#667085",
                      },
                    }}
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    placeholder="Enter Password Here"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon fontSize="medium" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPasswordClick}>
                            {showPassword ? (
                              <VisibilityOutlinedIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  <MDTypography variant="button" color="error" mt={1} display="flex">
                    {passwordError}
                  </MDTypography>
                </MDBox>
                <MDBox mt={2}>
                  <MDButton
                    variant="gradient"
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "#191A51",
                      color: "#fff",
                      padding: 2,
                      fontSize: pxToRem(16),
                      fontWeight: 700,
                      width: pxToRem(320),
                    }}
                    disabled={loading}
                    onClick={handleLogin}
                    fullWidth
                  >
                    {loading ? `Loading...` : "Log In"}
                  </MDButton>
                </MDBox>

                <MDBox textAlign="center" mt={4}>
                  <MDTypography
                    variant="caption"
                    sx={{ color: "#8C8C99", fontSize: pxToRem(12), fontWeight: 400 }}
                    fontWeight="light"
                  >
                    ©2023 Harptec. All rights reserved.
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;
