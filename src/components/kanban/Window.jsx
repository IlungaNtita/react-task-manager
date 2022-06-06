// import Modal from "react-modal";
import MDButton from "components/MDButton";
// import StopWatch from "./StopWatch";
import MDTypography from "components/MDTypography";
// import CancelIcon from '@mui/icons-material/Cancel';
// import CreateIcon from '@mui/icons-material/Create';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  useMaterialUIController,
} from "context";

const Window = ({ show, onClose, item, setTasks, tasks, deleteTask }) => {
    // ui
    const [controller] = useMaterialUIController();
    const {
        darkMode,
    } = controller;

    const onSubmit = (e) => {
        // using javascript spread to append todos
        e.preventDefault()
        deleteTask({variables:{id:item.id}})
        // setTasks(tasks.filter((element) => {
        //     return element.id !== item.id
        // }))
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
                {`Delete ${item.title}`}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <MDTypography variant="h4" color="dark" >Are you sure you you want to delete "{item.title}"?</MDTypography>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MDButton onClick={onClose}>Disagree</MDButton>
                <MDButton onClick={onSubmit} autoFocus>
                    Agree
                </MDButton>
                </DialogActions>
                </div>
            </Dialog>
        </div>
       
    );
};

export default Window;