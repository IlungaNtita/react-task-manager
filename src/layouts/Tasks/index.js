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
// import Card from "@mui/material/Card";

// Focus React components
import MDBox from "components/MDBox";

// Focus React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Homepage from "layouts/Homepage";
// import Header from "components/Header";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_TASKS } from "../../graphql/queries";
import { TASK_CREATE, UPDATE_TASK, DELETE_TASK } from "../../graphql/mutations";

function Tasks() {
  const { loading:tasksLoading, error:tasksError, data:taskData } = useQuery(ALL_TASKS, { errorPolicy: 'all' });
  const { mutate: taskCreate } = useMutation(TASK_CREATE,{
    refetchQueries: [
    {query: ALL_TASKS}, // DocumentNode object parsed with gql
    ]},
  );
  const [taskUpdate, { data:taskUpdateData }] = useMutation(UPDATE_TASK);
  const [taskDelete, { data:taskDeleteData }] = useMutation(DELETE_TASK);
  if (tasksLoading) return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
              <h3>Loading tasks, this can take some time.</h3>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
  else if (tasksError) return <h2> ERROR...: {tasksError} </h2>;
  if (!tasksLoading) return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
              <DndProvider backend={HTML5Backend}>
                <Homepage 
                  taskData={taskData.allTasks} 
                  createTask={taskCreate}
                  updateTask={taskUpdate}
                  deleteTask={taskDelete}
                  />
                {/* {data.allTasks.map(s => {
                    return (<h1>{s.icon}</h1>)})
                } */}
              </DndProvider>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tasks;
