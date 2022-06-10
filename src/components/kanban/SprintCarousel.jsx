// Focus React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import { Carousel } from '@trendyol-js/react-carousel';
import { useMaterialUIController } from "context";

// Sprint page components
function SprintCarousel({sprints}) {
    const theId = localStorage.getItem("activeSprint") || 0
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [activeSprint, setActiveSprint] = useState(theId);
    const handleElementClick = (itemId) => {
        setActiveSprint(itemId)
        localStorage.setItem("activeSprint", itemId)
        console.log("clicked handleElementClick", activeSprint)
    }
    return (
        <Grid container justifyContent="center" className="mb-5">
            <Grid item xs={10} lg={10}>
                <Carousel key={activeSprint} show={2} slide={2} swiping={true} infinite={false}>
                    {sprints.map((i) => <Grid onClick={() => handleElementClick(i.id)} component="a" key={i.id} item className="mr-4 ml-2">
                        <MDBox
                            component="a"
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
                            <MDTypography variant="h6" fontWeight="medium">
                                {i.title}{i.id} active:{activeSprint}
                            </MDTypography>
                            <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                            <Tooltip title="Edit Card" placement="top">
                                {i.id === activeSprint?<Icon color="inherit" sx={{ cursor: "pointer" }} fontSize="small">
                                done
                                </Icon>:
                                <p></p>}
                            </Tooltip>
                            </MDBox>
                        </MDBox>
                    </Grid>)}
                    
                </Carousel>
            </Grid>
        </Grid>
    );
}

export default SprintCarousel;
