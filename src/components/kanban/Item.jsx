import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../../data/types";
import StopWatch from "./StopWatch";
import Card from '@mui/material/Card';
import MDTypography from "components/MDTypography";

const Item = ({ item, index, moveItem, status, setTasks, tasks }) => {
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
                    {item.content}
                </MDTypography>
                <MDTypography sx={{ fontSize: 14 }} gutterBottom>
                    {item.icon}
                </MDTypography>
                <div class="loader-3">
                    <div class="circle"></div>
                </div>
                <StopWatch item={item} tasks={tasks} setTasks={setTasks}/>
            </Card>
            <Window
                item={item}
                onClose={onClose}
                show={show}
            />
        </Fragment>
        // {! item.id ?
        //         <Box sx={style}>
        //             <div className={"close-btn-ctn"}>
        //                 <MDTypography style={{ flex: "1 90%" }} variant="h2" fontWeight="large" display="block" color="text" >{item.title}</MDTypography>
        //                 <button className="close-btn" onClick={onClose}><CloseIcon /></button>
        //             </div>
        //             <br />
        //             <div>
        //                 <MDTypography variant="h3" fontWeight="large" display="block" color="text" >Description</MDTypography>
        //                     <MDTypography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        //                         {item.content}
        //                     </MDTypography>
        //                 <MDTypography variant="h3" fontWeight="large" display="block" color="text" >Status</MDTypography>
        //                     <MDTypography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        //                         {item.icon} {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
        //                     </MDTypography>
        //                 <MDTypography variant="h3" fontWeight="large" display="block" color="text" >
        //                     Time
        //                 </MDTypography>
        //                 <StopWatch/>
        //             </div>
        //         </Box>
        //         :
        //         <p>Loading..</p>
        //     }
    );
};

export default Item;