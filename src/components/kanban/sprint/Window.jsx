// import Modal from "react-modal";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MDSnackbar from "components/MDSnackbar";
import { useState } from "react";

import {
  useMaterialUIController,
} from "context";

const Window = ({ show, onClose, sprints, deleteItem, editableItem }) => {
    // ui
    const [controller] = useMaterialUIController();
    const {
        darkMode,
    } = controller;
    const [infoSB, setInfoSB] = useState(false);
    const openInfoSB = () => setInfoSB(true);
    const closeInfoSB = () => setInfoSB(false);

    const renderInfoSB = (
        <MDSnackbar
        icon="notifications"
        title="Sprint"
        content="Your sprint has been succesfully deleted."
        open={infoSB}
        onClose={closeInfoSB}
        close={closeInfoSB}
        />
    );

    let itemData = {}
    for(let i of sprints){
        if(i.id === editableItem){
            itemData = i
        }
    }

    return (
        <div >
            <Dialog
                open={show}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                
            ><div style={darkMode ? {backgroundColor: "#313958"} : {}} >
                <DialogTitle id="alert-dialog-title">
                {`Delete ${itemData.title}`}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <MDTypography variant="p" color="dark" >Are you sure you you want to delete "{itemData.title}"?</MDTypography>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MDButton onClick={onClose}>Disagree</MDButton>
                <MDButton onClick={() => {
                    openInfoSB();
                    deleteItem() 
                    }} autoFocus>
                    Agree
                </MDButton>
                </DialogActions>
                </div>
            </Dialog>
            {renderInfoSB}
        </div>
       
    );
};

export default Window;