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
import CheckIcon from '@mui/icons-material/Check';

const Item = ({ item, index, moveItem, status, setTasks, tasks,
    createTask,
    updateTask,
    deleteTask}) => {
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
    const [contentInput, setContentInput] = useState(item.description);
    const handleUpdate = () => {
        updateTask(
            {
                variables: {
                    id:item.id,
                    title:titleInput,
                    description:contentInput,
                }
            }
        )
        console.log(titleInput, "titleInput", item.id, "item title", item.title)
        setToggle(true)
    };

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
                    onDoubleClick={() => !toggle}
                >
                    <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
                    <br />
                    {toggle === true ?
                    <div onDoubleClick={() => setToggle(false)}>
                        <MDTypography sx={{ fontSize: 18 }}  gutterBottom>
                            {item.title}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: 15 }}  gutterBottom>
                            {item.description}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: 16 }} gutterBottom>
                            {item.icon}
                        </MDTypography>
                        <StopWatch item={item} tasks={tasks} setTasks={setTasks} key={item.id}/>
                    </div>
                    :
                    <div onDoubleClick={() => setToggle(true)}>
                        <TextField
                        style={{color:"red"}}
                        id="standard-textarea"
                        label="Title"
                        multiline
                        maxRows={4}
                        defaultValue={titleInput}
                        onChange={titleHandleChange}
                        variant="standard"
                        />
                        <TextField
                        id="standard-multiline-static"
                        label="Content"
                        multiline
                        rows={4}
                        onChange={contentHandleChange}
                        defaultValue={contentInput}
                        variant="standard"
                        />
                        <div>
                            <MDButton onClick={onOpen} variant="outlined" color="error" className="mt-2 mr-2" startIcon={<DeleteIcon />}>
                                Delete
                            </MDButton>
                            <MDButton onClick={handleUpdate} variant="outlined" color="success" className="mt-2 mr-2" startIcon={<CheckIcon />}>
                                Save
                            </MDButton>
                        </div>
                        <Window
                            item={item} 
                            tasks={tasks} 
                            setTasks={setTasks} 
                            key={item.id}
                            onClose={onClose}
                            show={show}
                            deleteTask={deleteTask}
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