import React from "react";
// @mui material components
import Card from "@mui/material/Card";

// Focus React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

const Col = ({ isOver, children }) => {
    const className = isOver ? " highlight-region" : "";

    return (
        <div>
            <Card id="delete-account" className="box" style={{borderRadius: "20px"}}>
                <MDBox pt={1} pb={2} px={2} >
                    <MDBox pt={1} pb={2} px={2}><MDButton>Add new task</MDButton></MDBox>
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