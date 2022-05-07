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

import "@asseinfo/react-kanban/dist/styles.css";

import Homepage from "layouts/Homepage";
// import Header from "components/Header";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { useState } from "react";
import { data, statuses } from "../../data";

function Tasks() {
  const [tasks, setTasks] = useState(data)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
              <DndProvider backend={HTML5Backend}>
                <Homepage tasks={tasks} setTasks={setTasks} />
              </DndProvider>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tasks;
