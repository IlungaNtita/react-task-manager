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
import MDSnackbar from "components/MDSnackbar";
import { useState } from "react";

const Window = ({ show, onClose, item, setTasks, tasks, deleteTask, taskData }) => {
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
        title="Task"
        content="Your task has been succesfully deleted."
        open={infoSB}
        onClose={closeInfoSB}
        close={closeInfoSB}
        />
    );

    const onSubmit = () => {
        // using javascript spread to append todos
        setTimeout(() => {
            deleteTask(
                {
                    variables:{id:item.id},
                    onCompleted: () => {
                        openInfoSB()
                    }
                }
            )
            setTasks(taskData)
            setTasks(tasks.filter((element) => {
            return element.id !== item.id
        }))
        }, 1000)
        onClose();
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
                    <MDTypography variant="p" color="dark" >Are you sure you you want to delete "{item.title}"?</MDTypography>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MDButton onClick={onClose}>Disagree</MDButton>
                <MDButton onClick={() => {onSubmit(); openInfoSB();}} autoFocus>
                    Delete
                </MDButton>
                </DialogActions>
                </div>
            </Dialog>
            {renderInfoSB}
        </div>
       
    );
};

export default Window;