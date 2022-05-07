import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
// import Modal from "react-modal";
import MDButton from "components/MDButton";
import StopWatch from "./StopWatch";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import formatTime from 'utils/formatTime'

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

const Window = ({ show, onClose, item }) => {
    const [itemTimer, setItemTimer] = useState(item.time)
    const countRef = useRef(null)

    useEffect(() => {
    	// Update the state with this data
		if(item && item.id)	{
			console.log("ID is:",item.id )
			handleStart()
		}
  	}, []);

    const handleStart = () => {
		countRef.current = setInterval(() => {
			setItemTimer((itemTimer) => itemTimer + 1)
		}, 1000)
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
                 <MDTypography style={{ flex: "1 90%" }} variant="h2" fontWeight="large" display="block" color="text" >{item.title}</MDTypography>
                 <button className="close-btn" onClick={onClose}><CloseIcon /></button>
             </div>
             <br />
             <div>
                 <MDTypography variant="h3" fontWeight="large" display="block" color="text" >Description</MDTypography>
                     <MDTypography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                         {item.content}
                     </MDTypography>
                 <MDTypography variant="h3" fontWeight="large" display="block" color="text" >Status</MDTypography>
                     <MDTypography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                         {item.icon} {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
                     </MDTypography>
                 <MDTypography variant="h3" fontWeight="large" display="block" color="text" >
                     Time
                 </MDTypography>
                 <div className="loader" style={{left:"130px", }}>
                    <span className="hour"></span>
                    <span className="min"></span>
                    <span className="circel"></span>
                 </div>

                 <div style={{left:"130px"}}><p>{formatTime(itemTimer)}</p></div>
             </div>
            </Box>
        </Modal>
    );
};

export default Window;