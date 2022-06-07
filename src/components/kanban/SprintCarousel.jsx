// Focus React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import { Carousel } from '@trendyol-js/react-carousel';
import { useMaterialUIController } from "context";

// Sprint page components
function SprintCarousel() {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    return (
        <Grid container justifyContent="center" className="mb-5">
            <Grid item xs={10} lg={10}>
                <Carousel show={2} slide={2} swiping={true}>
                    <Grid item className="mr-4">
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
                    <Grid item className="mr-3">
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
                    <Grid item className="mr-3">
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
                    <Grid item className="mr-3">
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
                    
                </Carousel>
            </Grid>
        </Grid>
    );
}

export default SprintCarousel;
