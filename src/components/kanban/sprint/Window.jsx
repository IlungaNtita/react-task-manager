// import Modal from "react-modal";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  useMaterialUIController,
} from "context";

const Window = ({ show, onClose, item, deleteItem }) => {
    // ui
    const [controller] = useMaterialUIController();
    const {
        darkMode,
    } = controller;

    return (
        <div >
            <Dialog
                open={show}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                
            ><div style={darkMode ? {backgroundColor: "#313958"} : {}} >
                <DialogTitle id="alert-dialog-title">
                {`Delete ${item.title}`}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <MDTypography variant="p" color="dark" >Are you sure you you want to delete "{item.title}"?</MDTypography>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MDButton onClick={onClose}>Disagree</MDButton>
                <MDButton onClick={deleteItem} autoFocus>
                    Agree
                </MDButton>
                </DialogActions>
                </div>
            </Dialog>
        </div>
       
    );
};

export default Window;