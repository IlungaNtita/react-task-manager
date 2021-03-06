import React, { Fragment, useState, useRef, useEffect } from "react";
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
    updateTaskTime,
    deleteTask,
    updated,
    setUpdated,
    taskData}) => {
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
        setTasks(
            tasks.map((element) => {
                if(element.id === item.id ){
                    return { ...element, title: titleInput, description: contentInput }
                }
                return element;
            })
        )
   
        setTimeout(() => {
            updateTask(
                {
                    variables: {
                        id:item.id,
                        title:titleInput,
                        description:contentInput,
                        status:item.status
                    }
                }
            )

            setUpdated(false)
            setToggle(true)
        }, 2000)

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

    let localTask = JSON.parse(localStorage.getItem(`task_${item.id}`)) || {minutes:item.minutes, hours: item.hours, seconds: item.seconds}
    
    useEffect(() => {
        if(item){
            if((item && item.status === "Done" && localTask) && (localTask.minutes || localTask.seconds || localTask.hours) )	{
                let localTask = JSON.parse(localStorage.getItem(`task_${item.id}`))
                setTimeout(() => {
                    updateTaskTime(
                        {
                            variables: {
                                id:item.id,
                                minutes: localTask.minutes, hours: localTask.hours, seconds: localTask.seconds,
                                status:"Done",
                                icon:item.icon
                            }
                        }
                    )
                    console.log("Done worked", taskData)
                }, 1500)
            }
            else if(item && item.status === "In Progress" && localTask ){
                // let localTask = JSON.parse(localStorage.getItem(`task_${item.id}`))
                updateTaskTime(
                    {
                        variables: {
                            id:item.id,
                            minutes: localTask.minutes, 
                            hours: localTask.hours, 
                            seconds: localTask.seconds,
                            status:"In Progress",
                            icon:item.icon
                        }
                    }
                )
                console.log("In Progress worked", taskData)
            }
            else if((item && item.status === "To Do" && localTask ) && (localTask.minutes || localTask.seconds || localTask.hours))	{
                updateTaskTime(
                    {
                        variables: {
                            id:item.id,
                            minutes: localTask.minutes,
                            hours: localTask.hours,
                            seconds: localTask.seconds,
                            status:"To Do",
                            icon:item.icon
                        }
                    }
                )
                console.log("In Progress worked", taskData)
            }
        }
    }, [])

    
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
                        <StopWatch item={item} tasks={tasks} setTasks={setTasks} taskData={taskData} updateTask={updateTask}/>
                    </div>
                    :
                    <div onDoubleClick={() => setToggle(true)}>
                        <TextField
                        style={{color:"red"}}
                        id="standard-textarea"
                        label="Title"
                        multiline
                        fullWidth
                        maxRows={4}
                        defaultValue={titleInput}
                        onChange={titleHandleChange}
                        variant="standard"
                        />
                        <TextField
                        id="standard-multiline-static"
                        label="Content"
                        multiline
                        fullWidth
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
                            onClose={onClose}
                            show={show}
                            deleteTask={deleteTask}
                            taskData={taskData}
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