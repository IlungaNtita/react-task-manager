import { useState } from "react";
// import Modal from "react-modal";
import MDButton from "components/MDButton";
// import StopWatch from "./StopWatch";
import MDTypography from "components/MDTypography";
import DeleteIcon from '@mui/icons-material/Delete';
// import CancelIcon from '@mui/icons-material/Cancel';
// import CreateIcon from '@mui/icons-material/Create';

import 'antd/dist/antd.css';
import { Modal } from 'antd';

// Focus React components
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import TextField from '@mui/material/TextField';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const data = [
    {
        id: 1,
        icon: "⭕️",
        status: "To Do",
        title: "Human Interest Form",
        content: "Fill out human interest distribution form",
        seconds: 0,
        minutes: 0,
        hours: 0,
    }, {
        id: 2,
        icon: "⭕️",
        status: "In Progress",
        title: "Purchase present",
        content: "Get an anniversary gift",
        seconds: 0,
        minutes: 0,
        hours: 0,
    }
];

const Window = ({ show, onClose, item, setTasks, tasks }) => {


    const onSubmit = (e) => {
        // using javascript spread to append todos
        e.preventDefault()
        setTasks(tasks.filter((element) => {
            return element.id !== item.id
        }))
    }

    return (
        <Modal title={`Delete ${item.title}`} visible={show} onCancel={onClose} onOk={onSubmit}>
            <div>
                <div>
                    <MDTypography style={{ flex: "1 90%" }} variant="h4" display="block" color="text" >Are you sure you you want to delete {item.title}?</MDTypography>
                </div> 
            </div>
        </Modal>
    );
};

export default Window;