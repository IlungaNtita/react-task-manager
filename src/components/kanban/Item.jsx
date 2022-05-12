import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../../data/types";
import StopWatch from "./StopWatch";
import Card from '@mui/material/Card';
import MDTypography from "components/MDTypography";
import TextField from '@mui/material/TextField';
import MDButton from "components/MDButton";
import DeleteIcon from '@mui/icons-material/Delete';

const Item = ({ item, index, moveItem, status, setTasks, tasks }) => {
    const ref = useRef(null);
    const [toggle, setToggle] = useState(true);
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE, ...item, index,
        item: {...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [titleInput, setTitleInput] = useState(item.title);
    const [contentInput, setContentInput] = useState(item.content);
    const onToggle = () => setToggle(false);

    function titleHandleChange(event) {
        setTitleInput(event.target.value);
    }
    function contentHandleChange(event) {
        setContentInput(event.target.value);
    }
    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    drag(drop(ref));
    
    
    return (
            status !== undefined ?
            <Fragment>
                <Card
                    ref={ref}
                    style={{ opacity: isDragging ? 0 : 1 }}
                    className={"item"}
                >
                    <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
                    <br />
                    {toggle === true ?
                    <div onDoubleClick={() => setToggle(false)}>
                        <MDTypography sx={{ fontSize: 17 }}  gutterBottom>
                        {item.title}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: 13 }}  gutterBottom>
                            {item.content}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: 16 }} gutterBottom>
                            {item.icon}
                        </MDTypography>
                        <StopWatch item={item} tasks={tasks} setTasks={setTasks} key={item.id}/>
                    </div>
                    :
                    <div onDoubleClick={() => setToggle(true)}>
                        <TextField
                        id="standard-textarea"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        defaultValue={titleInput}
                        onChange={titleHandleChange}
                        variant="filled"
                        />
                        <TextField
                        id="standard-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        onChange={contentHandleChange}
                        defaultValue={contentInput}
                        variant="filled"
                        />
                        <div>
                            <MDButton onClick={onOpen} variant="outlined" color="error" className="mt-2 mr-2" startIcon={<DeleteIcon />}>
                                Delete
                            </MDButton>
                        </div>
                        <Window
                            item={item} 
                            tasks={tasks} 
                            setTasks={setTasks} 
                            key={item.id}
                            onClose={onClose}
                            show={show}
                        />
                    </div>
                }
                </Card>
            </Fragment>
            :
            <p>Loading...</p>
    )
};

export default Item;