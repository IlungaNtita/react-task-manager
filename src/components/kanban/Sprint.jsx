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
import Card from "@mui/material/Card";

// Focus React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Icon from "@mui/material/Icon";
function Sprint() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Sprint
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          Add Sprint
        </MDButton>
      </MDBox>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="button" fontWeight="regular" color="text">
            &nbsp;<strong>30 done</strong> this month
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <MDBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
            pr={1}
            mb={true ? 0 : 1}
            >
            <MDBox lineHeight={1.125}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    caption
                </MDTypography>
                <MDTypography variant="caption" fontWeight="regular" color="text">
                    caption
                </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center">
                <MDTypography variant="button" fontWeight="regular" color="text">
                    caption
                </MDTypography>
                <MDBox display="flex" alignItems="center" lineHeight={1} ml={3} sx={{ cursor: "pointer" }}>
                <Icon fontSize="small">picture_as_pdf</Icon>
                <MDTypography variant="button" fontWeight="bold">
                    &nbsp;PDF
                </MDTypography>
                </MDBox>
            </MDBox>
            </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Sprint;
