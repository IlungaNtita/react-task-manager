// import Modal from "react-modal";
import MDButton from "components/MDButton";
// Clocked React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { SPRINT_CREATE } from "graphql/mutations";
import { WHOAMI } from "graphql/queries";

import {
  useMaterialUIController,
} from "context";
import {useUser, } from "UserContext"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import MDSnackbar from "components/MDSnackbar";

const AddItemWindow = ({ show, onClose, item, addItem }) => {
    const activeUser = useUser
    // ui
    const [controller] = useMaterialUIController();
    const {
        darkMode,
    } = controller;
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [sprintCreate] = useMutation(SPRINT_CREATE,{
        refetchQueries: [
            {query: WHOAMI
            },
        ]}
    );
    
    const [successSB, setSuccessSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);

    const renderSuccessSB = (
    <MDSnackbar
        color="success"
        icon="check"
        title="Sprint Created"
        content="Your sprint has been succesfully created."
        open={successSB}
        onClose={closeSuccessSB}
        close={closeSuccessSB}
        bgWhite
        />
    );

    const addSprint = () => {
        setTimeout(() => {
            sprintCreate(
                {   variables: 
                    { 
                        title:title, 
                        description: description,
                        status: "ACTIVE",
                        user: localStorage.getItem("ACTIVEUSER")
                    },
                }
            )
            onClose()
            openSuccessSB()
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
                            defaultValue={title}
                            onChange={e => setTitle(e.target.value)}
                            autoComplete
                            fullWidth />
                    </MDBox>
                    <MDBox mb={2} mt={2}>
                        <MDInput
                            type="text" 
                            label="Description" 
                            defaultValue={description}
                            onChange={e => setDescription(e.target.value)}
                            autoComplete
                            fullWidth />
                    </MDBox>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MDButton onClick={onClose}>Disagree</MDButton>
                <MDButton onClick={addSprint} autoFocus>
                    Create
                </MDButton>
                </DialogActions>
                </div>
            </Dialog>
            {renderSuccessSB}
        </div>
       
    );
};

export default AddItemWindow;