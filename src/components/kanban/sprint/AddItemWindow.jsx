// import Modal from "react-modal";
import MDButton from "components/MDButton";
// Focus React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { SPRINT_CREATE, SPRINT_DELETE, SPRINT_UPDATE } from "graphql/mutations";

import {
  useMaterialUIController,
} from "context";

const AddItemWindow = ({ show, onClose, item, addItem }) => {
    // ui
    const [controller] = useMaterialUIController();
    const {
        darkMode,
    } = controller;

    const addTask = () => {
        setTimeout(() => {
            SPRINT_CREATE(
                {   variables: 
                    { 
                        title:"title", 
                        description: "description",
                        status: "ACTIVE",
                        user: localStorage.getItem("ACTIVEUSER")
                    },
                }
            )
        })
    }

    return (
        <div >
            <Dialog
                open={show}
                onClose={onClose}
                sx={{ '& .MuiDialog-paper': { width: '80%'} }}
            ><div style={darkMode ? {backgroundColor: "#313958"} : {}} >
                <DialogTitle id="alert-dialog-title">
                Add Sprint
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <MDBox mb={2} mt={2}>
                        <MDInput 
                            type="text" 
                            label="Title" 
                            // defaultValue={username}
                            // onChange={e => setUsername(e.target.value)}
                            autocomplete
                            fullWidth />
                    </MDBox>
                    <MDBox mb={2} mt={2}>
                        <MDInput 
                            type="text" 
                            label="Description" 
                            // defaultValue={username}
                            // onChange={e => setUsername(e.target.value)}
                            autocomplete
                            fullWidth />
                    </MDBox>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MDButton onClick={onClose}>Disagree</MDButton>
                <MDButton onClick={addItem} autoFocus>
                    Create
                </MDButton>
                </DialogActions>
                </div>
            </Dialog>
        </div>
       
    );
};

export default AddItemWindow;