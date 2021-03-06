/**
=========================================================
* Clocked React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Clocked React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Clocked React context
import { useMaterialUIController } from "context";
import { useNavigate } from 'react-router-dom';

function Bill({ name, company, email, vat, noGutter, description, status, deleteItem, editItem, itemId }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate()
  // const handleElementClick = () => {
  //   localStorage.setItem("activeSprint", itemId)
  //   console.log("clicked", itemId)
  //   navigate('/tasks');
  // }
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
      
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="primary" onClick={handleElementClick}>
                <Icon>view</Icon>&nbsp;view tasks
              </MDButton>
            </MDBox>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={deleteItem}>
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={editItem}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MDBox>
        </MDBox>
        
        <MDBox mb={1} lineHeight={0}>
          <MDTypography style={{size:30}} variant="h6" color="text">
            &nbsp;&nbsp;&nbsp;
              {description}
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption">
          {status}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill


export default Bill;
