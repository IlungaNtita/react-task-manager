import React from "react";
// @mui material components
import Card from "@mui/material/Card";

// Focus React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// Billing page components
import Bill from "layouts/billing/components/Bill";

const Col = ({ isOver, children }) => {
    const className = isOver ? " highlight-region" : "";

    return (
        <div>
            <Card id="delete-account" class="box" style={{borderRadius: "20px"}}>
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

{/* <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Billing Information
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card> */}