/**
=========================================================
* Clocked React - v2.1.0
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
import Checkbox from "@mui/material/Checkbox";

// Clocked React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";


import {CREATE_USER} from "graphql/mutations"

import {WHOAMI} from "graphql/queries"

import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "constants"

import {useUser, useUpdateUser} from "UserContext"
import { Alert } from "@mui/material";
import MDAlert from "components/MDAlert";

function Cover() {
  const updateActiveUser = useUpdateUser()
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const [createUser, { data:createUserData, loading:createUserLoading, error:createUserError }] = useMutation(CREATE_USER,{
    refetchQueries: [
      {query: WHOAMI}, // DocumentNode object parsed with gql
    ]},
  );
  let errorMessage = ""
  const onSignUp = () => {

        if(password === "" || password.length < 8){
          setError("Your password should be atleast 8 characters long.") 
          console.log(error)
        }
        else if(password2 !== password){
          setError("Your passwords do not match.")
          console.log(error)
        }
        else if(validateEmail(email) === null){
          setError("Please input a valid email address.") 
          console.log(error)
        }
        else{
          createUser(
            {   
              variables: { 
                username:username, 
                email:email,
                password: password,
              },
              onCompleted: ({ createUser }) => {
                localStorage.setItem(AUTH_TOKEN, createUser.token);
                localStorage.setItem("ACTIVEUSER", createUser.user.id);
                updateActiveUser()
                navigate('/');
              }
            }
          )
        }
      
  }

  if(createUserError){
    let signupError = createUserError.message
    errorMessage = signupError
    if(signupError.includes("UNIQUE")){
      errorMessage = `The username ${username} is not available.`
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  };
  
  return (
    <CoverLayout image={bgImage}>
      <Card className="mb-5">
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
              type="text" 
              label="Username"
              variant="standard" 
              defaultValue={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete
              fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
              type="email" 
              label="Email" 
              variant="standard"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete
              fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
              defaultValue={password}
              onChange={e => setPassword(e.target.value)}
              type="password" 
              label="Password" 
              variant="standard" 
              autoComplete
              fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
              defaultValue={password2}
              onChange={e => setPassword2(e.target.value)}
              type="password" 
              label="Password confirm" 
              variant="standard" 
              fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={onSignUp} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>

            {createUserError?
            <MDAlert color="error" dismissible>
              <MDTypography variant="body2" color="white">                
                {errorMessage}
              </MDTypography>
            </MDAlert>:<></>}

            {error !== ""?
            <MDAlert color="error" dismissible>
              <MDTypography variant="body2" color="white">                
                {error}
              </MDTypography>
            </MDAlert>:<></>}

          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
