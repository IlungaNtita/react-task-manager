// import Modal from "react-modal";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Focus React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import {
  useMaterialUIController,
} from "context";
import { useState } from "react";
import { SPRINT_UPDATE } from "graphql/mutations";
import { WHOAMI } from "graphql/queries";
import { useMutation } from "@apollo/client";
import MDSnackbar from "components/MDSnackbar";
import { ACTIVE_SPRINT } from "constants";

const EditWindow = ({ show, onClose, sprints, editableItem }) => {
    // ui
    const [controller] = useMaterialUIController();
    const {
        darkMode,
    } = controller;
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [successSB, setSuccessSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const [sprintUpdate] = useMutation(SPRINT_UPDATE,{
        refetchQueries: [
            {query: WHOAMI
            },
        ]}
    );
    
    // Function to edit a sprint
    const editSprint = () => {

        if(title === ""){
            setTitle(itemData.title)
        }
        if(description === ""){
            setDescription(itemData.description)
        }
            
        setTimeout(() => {
            sprintUpdate(
                {   variables: 
                    {   
                        id: localStorage.getItem(ACTIVE_SPRINT),
                        title:title, 
                        description: description,
                        status: "ACTIVE",
                    },
                }
            )
            onClose()
            openSuccessSB()
        })
    }
    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Sprint Updated"
            content="Your sprint has been succesfully updated."
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
        />
    );
    let itemData = {}
    for(let i of sprints){
        if(i.id === editableItem){
            itemData = i
        }
    }

    return (
        <div>
            <Dialog
                open={show}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ '& .MuiDialog-paper': { width: '80%'} }}
            ><div style={darkMode ? {backgroundColor: "#313958"} : {}} >
                <DialogTitle id="alert-dialog-title">
                    {`Edit ${itemData.title}`}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <MDBox mb={2} mt={2}>
                        <MDInput 
                            type="text" 
                            label="Title" 
                            defaultValue={itemData.title}
                            onChange={e => setTitle(e.target.value)}
                            autoComplete
                            fullWidth />
                    </MDBox>
                    <MDBox mb={2} mt={2}>
                        <MDInput
                            type="text" 
                            label="Description" 
                            defaultValue={itemData.description}
                            onChange={e => setDescription(e.target.value)}
                            autoComplete
                            fullWidth />
                    </MDBox>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MDButton onClick={onClose}>Disagree</MDButton>
                <MDButton onClick={editSprint} autoFocus>
                    Edit
                </MDButton>
                </DialogActions>
                </div>
            </Dialog>
            {renderSuccessSB}
        </div>
       
    );
};

export default EditWindow;