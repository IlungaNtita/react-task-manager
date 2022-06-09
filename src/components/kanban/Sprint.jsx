// @mui material components
import Card from "@mui/material/Card";

// Focus React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";
import { useState } from "react";
import Bill from "layouts/billing/components/Bill";
import { WHOAMI } from "../../graphql/queries";
import { SPRINT_CREATE, SPRINT_DELETE, SPRINT_UPDATE } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

import { useNavigate } from 'react-router-dom';
import DataTable from "examples/Tables/DataTable";

// Data
import sprintTableData from "./sprintTableData"

function Sprint({sprints}) {
    const theId = localStorage.getItem("activeSprint") || "0"
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [sprintData, setSprintData] = useState(sprints);
    const [activeSprint, setActiveSprint] = useState(theId);
    
    const navigate = useNavigate()
    const handleElementClick = (itemId) => {

        setActiveSprint(itemId)
        localStorage.setItem("activeSprint", itemId)
        console.log("clicked", itemId)
        navigate('/tasks');
    }
    const onEdit = () => {
        // using javascript spread to append todos
        setTimeout(() => {
            sprintUpdate({variables:{id:activeSprint}})
        }, 1000)
    }

    const onDelete = () => {
        // using javascript spread to append todos
        setTimeout(() => {
            sprintDelete({variables:{id:activeSprint}})
        }, 1000)
    }
    const { columns } = sprintTableData();
    const color = "success"
    const Author = ({ image, title, description, id }) => (
        <MDBox key={id} onClick={() => handleElementClick(id)} display="flex" alignItems="center" lineHeight={1}>
            {/* <MDAvatar component="a" src={image} name={title} size="sm" /> */}
            {id === activeSprint?
            <MDBox
            variant="gradient"
            bgColor={color}
            color={color === "light" ? "dark" : "white"}
            coloredShadow={color}
            borderRadius="xl"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="2rem"
            height="2rem"
            >
                <Icon fontSize="medium" color="inherit">
                    done
                </Icon>
          
            </MDBox>
            :
            <MDBox
            variant="gradient"
            
            borderRadius="xl"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="2rem"
            height="2rem"
            >
                <Icon fontSize="medium" color="inherit">
                    
                </Icon>
          
            </MDBox>
            }
            <MDBox ml={2} lineHeight={1}>
                <MDTypography component="a" display="block" variant="button" fontWeight="medium">
                {title}
                </MDTypography>
                <MDTypography component="a" variant="caption">{description}</MDTypography>
            </MDBox>
        </MDBox>
    );

    const rows1 = [
        sprints.map((item) => 
            {
                return {
                    author: <Author key={item.id} component="a" onClick={() => handleElementClick(1)} image={team2} title={item.title} description={item.description} id={item.id}/>,
                    status: (
                    <MDBox onClick={() => handleElementClick(item.id)} ml={-1}>
                        <MDBadge component="a" onClick={() => handleElementClick(item.id)} badgeContent={item.status} color="success" variant="gradient" size="sm" />
                    </MDBox>
                    ),
                    action: (
                        <div>
                            <MDTypography onClick={onEdit} component="a" href="#" variant="caption" color="text" fontWeight="medium" color="success" className="mr-2">
                                <Icon className="mr-1">edit</Icon>Edit
                            </MDTypography>
                            <MDTypography onClick={onDelete} component="a" href="#" variant="caption" color="text" fontWeight="medium" color="primary">
                                <Icon className="mr-1">delete</Icon>Delete
                            </MDTypography>
                        </div>
                    
                    ),
                }
                    
            },
        )
    ]
    const rows = rows1[0]
    

    const [sprintCreate] = useMutation(SPRINT_CREATE,{
        refetchQueries: [
            {query: WHOAMI}, // DocumentNode object parsed with gql
        ]},
    );
    const [sprintDelete] = useMutation(SPRINT_DELETE,{
        refetchQueries: [
            {query: WHOAMI}, // DocumentNode object parsed with gql
        ]},
    );
    const [sprintUpdate] = useMutation(SPRINT_UPDATE,{
        refetchQueries: [
            {query: WHOAMI}, // DocumentNode object parsed with gql
        ]},
    );

    const onAdd = () => {
        // using javascript spread to append todos
        setTimeout(() => {
            sprintCreate({
                variables: {
                    title:"New task (Double click to edit)", 
                    description: "",
                    status: "ACTIVE",
                    user: localStorage.getItem("activeSprint")
                }
            })
        }, 1000)
    }
    

    // console.log(sprints, "from sprints")
    return (
        <Card>

            <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                Sprints
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                { sprints ?
                                <DataTable
                                table={{ columns, rows }}
                                isSorted={false}
                                entriesPerPage={false}
                                showTotalEntries={false}
                                noEndBorder
                                sprintData={sprints}
                                />
                                :
                                <MDTypography variant="button" fontWeight="regular" color="text">
                                    &nbsp;<strong>No sprints yet.</strong> New sprints will display here.
                                </MDTypography>
                                }
                            </MDBox>
                        </Card>
                </Grid>
            </Grid>
            <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                <MDButton variant="gradient" color="dark" onClick={sprintCreate}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add Sprints
                </MDButton>
                <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                        &nbsp;<strong>No sprints yet.</strong> New sprints will display here.
                    </MDTypography>
                </MDBox>
            </MDBox>
            </MDBox>
        </Card>
    );
}

export default Sprint;