import { useState } from "react";
// import Modal from "react-modal";
import MDButton from "components/MDButton";
import StopWatch from "./StopWatch";
import MDTypography from "components/MDTypography";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CreateIcon from '@mui/icons-material/Create';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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
    let edit = false; 
    const [editMode, setEditMode] = useState(false)
    setTitleInput(item.title)
    setContentInput(item.content)


    const updateTask = () => {
        setEditMode(false)
        // using javascript spread to append todos
        setTasks(tasks.map((element) => {
            if(element.id === item.id ){
                return {
                    ...element, title: titleInput, content: contentInput
                }
            }
        }))
    }

    return (
        <Modal
            open={show}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <div className={"close-btn-ctn"}>
                <MDTypography style={{ flex: "1 90%" }} variant="h3" fontWeight="large" display="block" color="text" >{item.title}</MDTypography>
                <CancelIcon onClick={onClose}/>
            </div>
            <br />
            <div>
                {!editMode ? 
                <div>
                    <MDTypography variant="h4" fontWeight="large" display="block" color="text" >Description</MDTypography>
                        <MDTypography className="mb-3" sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            {item.content}
                        </MDTypography >
                    <MDTypography variant="h4" fontWeight="large" display="block" color="text" >Status</MDTypography>
                        <MDTypography className="mb-3" sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            {item.icon} {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
                        </MDTypography>
                    <MDTypography className="mb-3" variant="h4" fontWeight="large" display="block" color="text" >
                        Time
                    </MDTypography>
                    <div className="loader" style={{left:"130px", }}>
                        <span className="hour"></span>
                        <span className="min"></span>
                        <span className="circel"></span>
                    </div>
                    <StopWatch item={item} tasks={tasks} setTasks={setTasks} key={item.id}/>
                    <div>
                        <MDButton variant="outlined" color="error" className="mr-2" startIcon={<DeleteIcon />}>
                        Delete
                        </MDButton>
                        <MDButton variant="outlined" color="success" endIcon={<CreateIcon/>} onClick={ () => setEditMode(true)}>
                        Edit 
                        </MDButton>
                    </div>
                </div> 
                : 
                <div> 
                    <div>
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
                    </div>
                    <MDButton variant="outlined"  endIcon={<CreateIcon/>} onClick={ updateTask }>
                        Done 
                    </MDButton>
                </div>
                }
            </div>
            </Box>
        </Modal>
    );
};

export default Window;