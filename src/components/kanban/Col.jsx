import React from "react";
// @mui material components
import Card from "@mui/material/Card";

// Focus React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Focus React context
import {
  useMaterialUIController,
} from "context";

const Col = ({ isOver, children, setTasks, tasks }) => {
    // ui
    const [controller, dispatch] = useMaterialUIController();
    const {
        darkMode,
    } = controller;

    const className = isOver ? " highlight-region" : "";
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id: id, 
        title:"New task (Double click to edit)", 
        content: "", 
        status: "To Do", 
        icon: "⭕️",
        hours:0, 
        minutes:0, 
        seconds:0}

    const addTask = () => {
        setTasks([...tasks, newTask])
    }
    return (
        <div>
            <Card id="delete-account" className="gradient-border" style={{borderRadius: "20px", backgroundColor: "#313958"}}>
                <MDBox pt={1} pb={2} px={2} >
                    <MDBox pt={1} pb={2} px={2}><MDButton color={darkMode ? "light" : "dark"} variant="gradient" onClick={addTask}>Add new task</MDButton></MDBox>
                    <div className={className}>
                        <MDBox component="ul" style={{ height:"200vh" }}  display="flex" flexDirection="column" p={0} m={1}>
                            {children}
                        </MDBox>
                    </div>
                </MDBox>
            </Card>
        </div>
    );
};

export default Col;