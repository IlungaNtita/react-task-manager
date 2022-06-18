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

// @mui material components
import Grid from "@mui/material/Grid";

// Focus React components
import MDBox from "components/MDBox";

// Focus React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";



import Sprint from "components/kanban/Sprint"
import { useQuery } from "@apollo/client";
import { WHOAMI } from "graphql/queries";
import {useUser, useUpdateUser} from "UserContext"
import { useEffect, useState, useMemo } from "react";

function Dashboard() {
  const [activeUser, setActiveUser] = useState(localStorage.getItem("ACTIVEUSER"))
  const updateActiveUser = useUpdateUser()
  const { loading:whoAmILoading, error:whoAmIError, data:whoAmIData, refetch  } = useQuery(WHOAMI, { 
    errorPolicy: 'all',
    onCompleted: ({whoami}) => {
      // localStorage.setItem("ACTIVEUSER", whoami.id)
      updateActiveUser()
    }
  });

  useMemo(() => {
    refetch()
    console.log("running", activeUser)
    
  },[])
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid> */}
        <MDBox>
          <Grid container spacing={3}>
            
            <Grid item xs={12} md={12} lg={12}>
              {whoAmIData && whoAmIData.whoami?
                <Sprint sprints={whoAmIData.whoami.sprintSet}
                />
              :
                whoAmIError ? 
                <p>
                    Something happened
                </p>
                :                    
                <div className="loader"></div>
            }
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
