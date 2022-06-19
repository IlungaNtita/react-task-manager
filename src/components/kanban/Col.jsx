import React, { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Clocked React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Clocked React context
import {
  useMaterialUIController,
} from "context";
import MDSnackbar from "components/MDSnackbar";

const Col = ({ 
    isOver,
    children, 
    createTask, 
    setTasks, 
    taskData,
    activeSprint,
    tasks,
    created,
    setCreated,
 }) => {
    // UI 
    const [controller,] = useMaterialUIController();
    const {
        darkMode,
    } = controller;

    const className = isOver ? " highlight-region" : "";
    const [successSB, setSuccessSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Task Created"
            content="Your task has been succesfully created."
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
        />
    );
    const addTask = () => {
        createTask(
            {   variables: { 
                    title:"New task (Double click to edit)", 
                    description: "",
                    status: "To Do",
                    icon: "⭕️",
                    hours:0,
                    minutes:0,
                    seconds:0,
                    taskSprint: activeSprint
                },
                onCompleted: () => {
                    // const data = Object.assign(tasks, newdata);
                    setTimeout(()=>{
                        setCreated(true)
                    }, 1000)
                    openSuccessSB()                
                }
            }
        )
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
            {renderSuccessSB}
        </div>
    );
};

export default Col;