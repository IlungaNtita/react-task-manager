/**
=========================================================
* Focus React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Focus React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import {LOGIN_USER} from "graphql/mutations"

import {WHOAMI} from "graphql/queries"

import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "constants"

function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [loginUser, { data:loginUserData, loading:loginUserLoading, error:loginUserError }] = useMutation(LOGIN_USER,{
    refetchQueries: [
      {query: WHOAMI}, // DocumentNode object parsed with gql
    ]},
  );
  const onLogin = () => {
    loginUser(
      {   
        variables: { 
          username:username, 
          password: password,
        },
        onCompleted: ({ tokenAuth }) => {
          localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
          navigate('/');
        }
      }
    )
    setTimeout(() => {
      if(!loginUserError && !loginUserLoading){
        if(loginUserData){
          localStorage.setItem("userToken", loginUserData.tokenAuth.token)
          console.log(loginUserData.tokenAuth.token)
        }
      }
    }, 1000)
  }
  
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                type="username" 
                label="Username" 
                defaultValue={username}
                onChange={e => setUsername(e.target.value)}
                autocomplete
                fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="password" 
                label="Password"
                defaultValue={password} 
                onChange={e => setPassword(e.target.value)}
                autocomplete
                fullWidth 
                />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={onLogin} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
