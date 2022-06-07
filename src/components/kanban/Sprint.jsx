// @mui material components
import Card from "@mui/material/Card";

// Focus React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { useMaterialUIController } from "context";

function Sprint() {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    return (
        <Card sx={{ height: "100%" }}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
            Sprint
            </MDTypography>
            <MDButton variant="gradient" color="dark">
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;Add Sprint
            </MDButton>
        </MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp;<strong>30 done</strong> this month
            </MDTypography>
        </MDBox>
        {/* <MDBox p={2}>
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
        </MDBox> */}
        <MDBox p={2}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <MDBox
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                }}
                >
                <MDBox component="img" alt="master card" width="10%" mr={2} />
                <MDTypography variant="h6" fontWeight="medium">
                    ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
                </MDTypography>
                <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                    <Tooltip title="Edit Card" placement="top">
                    <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        edit
                    </Icon>
                    </Tooltip>
                </MDBox>
                </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <MDBox
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                sx={{
                    border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                }}
                >
                <MDBox component="img" alt="master card" width="10%" mr={2} />
                <MDTypography variant="h6" fontWeight="medium">
                    ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
                </MDTypography>
                <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                    <Tooltip title="Edit Card" placement="top">
                    <Icon sx={{ cursor: "pointer" }} fontSize="small">
                        edit
                    </Icon>
                    </Tooltip>
                </MDBox>
                </MDBox>
            </Grid>
            </Grid>
        </MDBox>
        </Card>
    );
}

export default Sprint;
