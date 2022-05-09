import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../../data/types";
import StopWatch from "./StopWatch";
import Card from '@mui/material/Card';
import MDTypography from "components/MDTypography";

const Item = ({ item, index, moveItem, status, setTasks, tasks, setTitleInput, setContentInput, titleInput, contentInput }) => {
    const ref = useRef(null);

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

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    drag(drop(ref));
    
    return (
        <Fragment>
            <Card
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
                onClick={onOpen}
            >
                <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
                <br />
                <MDTypography sx={{ fontSize: 16 }}  gutterBottom>
                    {item.title}
                </MDTypography>
                <MDTypography sx={{ fontSize: 16 }} gutterBottom>
                    {item.icon}
                </MDTypography>
                <StopWatch item={item} tasks={tasks} setTasks={setTasks} key={item.id}/>
            </Card>
            <Window
                setTitleInput={setTitleInput} 
                setContentInput={setContentInput}
                titleInput={titleInput} 
                contentInput={contentInput}
                item={item} 
                tasks={tasks} 
                setTasks={setTasks} 
                key={item.id}
                onClose={onClose}
                show={show}
            />
        </Fragment>
    );
};

export default Item;