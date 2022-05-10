import { useState } from "react";
// import Modal from "react-modal";
import MDButton from "components/MDButton";
import StopWatch from "./StopWatch";
import MDTypography from "components/MDTypography";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CreateIcon from '@mui/icons-material/Create';

import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

// Focus React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Window = ({ show, onClose, item, setTasks, tasks, setTitleInput, setContentInput, titleInput, contentInput }) => {
    setTitleInput(item.title)
    setContentInput(item.content)


    const onSubmit = (e) => {
        // using javascript spread to append todos
        e.preventDefault()
        setTitleInput(titleInput)
        setContentInput(contentInput)
        setTasks(tasks.map((element) => {
            if(element.id === item.id ){
                return {
                    ...element, title: titleInput, content: contentInput
                }
            }
        }))
    }

    return (
        <Modal title="Basic Modal" visible={show} onCancel={onClose} onOk={onSubmit}>
            <div className={"close-btn-ctn"}>
                <MDTypography style={{ flex: "1 90%" }} variant="h3" fontWeight="large" display="block" color="text" >{item.title}</MDTypography>
            </div>
            <br />
            <div>
                <div>
                    <form onSubmit={onSubmit}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        type="text"
                        multiline
                        maxRows={4}
                        defaultValue={titleInput}
                        className="mb-3"
                        fullWidth
                        />
                        <TextField
                        id="outlined-textarea"
                        label="Multiline Placeholder"
                        placeholder="Placeholder"
                        multiline
                        hidden
                        />
                        <TextField
                        id="outlined-multiline-static"
                        label="Multiline"
                        type="text"
                        multiline
                        rows={4}
                        defaultValue={contentInput}
                        className="mb-3"
                        fullWidth
                        />
                </form>
                    <div>
                        <MDButton variant="outlined" color="error" className="mr-2" startIcon={<DeleteIcon />}>
                        Delete
                        </MDButton>
                    </div>
                </div> 
                
            </div>
        </Modal>
    );
};

export default Window;