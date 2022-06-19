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

import { useState, useEffect, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Clocked React components
import MDBox from "components/MDBox";

// Clocked React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Homepage from "layouts/Homepage";
// import Header from "components/Header";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { useQuery, useMutation } from "@apollo/client";
import { SPRINT } from "../../graphql/queries";
import { TASK_CREATE, UPDATE_TASK, DELETE_TASK, UPDATE_TASK_TIME } from "../../graphql/mutations";
import {useUser, useUpdateUser} from "UserContext"

function Tasks() {
  const [activeUser, setActiveUser] = useState(localStorage.getItem("ACTIVEUSER"))
  const theId = localStorage.getItem("activeSprint") || 0
  const [activeSprint, setActiveSprint] = useState(theId);
  const { loading:sprintLoading, error:sprintError, data:sprintData, refetch } = useQuery(SPRINT, { 
    variables:{
      sprintId:activeSprint
    },
    errorPolicy: 'all' });
  const [taskCreate] = useMutation(TASK_CREATE,{
    refetchQueries: [
      {query: SPRINT,
        variables:{
          sprintId:activeSprint
        },
      }, // DocumentNode object parsed with gql
    ]}
  );

  const [taskUpdate] = useMutation(UPDATE_TASK,{
    refetchQueries: [
      {query: SPRINT,
        variables:{
          sprintId:activeSprint
        },
      }, // DocumentNode object parsed with gql
    ]},
  );
  const [taskUpdateTime] = useMutation(UPDATE_TASK_TIME,{
    refetchQueries: [
      {query: SPRINT,
        variables:{
          sprintId:activeSprint
        },
      }, // DocumentNode object parsed with gql
    ]},
  );
  const [taskDelete] = useMutation(DELETE_TASK,{
    refetchQueries: [
      {query: SPRINT,
        variables:{
          sprintId:activeSprint
        },
      },
    ]}
  );

  useMemo(() => {
    refetch()
    console.log("running", activeUser)
  },[])

  if (sprintLoading) return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
              <div className="loader-3"></div>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
  else if (sprintError) return <h2> ERROR...: {sprintError} </h2>;
  if (!sprintLoading) return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
              <DndProvider backend={HTML5Backend}>
                <Homepage
                  key={activeUser}
                  taskData={sprintData.sprint.taskSet} 
                  createTask={taskCreate}
                  updateTask={taskUpdate}
                  updateTaskTime={taskUpdateTime}
                  deleteTask={taskDelete}
                  activeSprint={activeSprint} 
                  setActiveSprint={setActiveSprint}
                  />
              </DndProvider>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tasks;
