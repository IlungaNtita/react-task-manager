import Item from "../components/kanban/Item";
import DropWrapper from "../components/kanban/DropWrapper";
import Col from "../components/kanban/Col";
import { statuses } from "../data";
// import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";

const Homepage = ({
    taskData, 
    createTask,
    updateTask,
    deleteTask}) => {
    const [tasks, setTasks] = useState(taskData)
    const [updated, setUpdated] = useState(false)
    useEffect(() => {
    	// update tasks once an tem has been updated
        if(updated === true){
            setTasks(taskData);
            console.log(taskData)
            setUpdated(false)
        }
  	}, []);

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setTasks(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon : mapping.icon })
            return [...newItems];
        })
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = tasks[dragIndex];
        setTasks(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems]
        });
    };

    
    return (
        <div className="row">
            { statuses ?
                statuses.map(s => {
                    return (
                        <div key={s.status} style={{ width:300 }} className="ml-3">

                            <MDTypography variant="h1" sx={{ fontSize: 18 }}  gutterBottom>
                                {s.status.toUpperCase()}
                            </MDTypography>

                            <DropWrapper onDrop={onDrop} status={s.status}>
                                <Col createTask={createTask} setTasks={setTasks} tasks={tasks} taskData={taskData}> 
                                {tasks
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Item
                                                        key={i.id} 
                                                        item={i} 
                                                        index={idx} 
                                                        moveItem={moveItem} 
                                                        status={s}
                                                        taskData={taskData}
                                                        tasks={tasks}
                                                        setTasks={setTasks}
                                                        createTask={createTask}
                                                        updateTask={updateTask}
                                                        deleteTask={deleteTask}
                                                        updated={updated}
                                                        setUpdated={setUpdated}/>
                                                        )}
                                </Col>
                            </DropWrapper>
                        </div> 
                    )
                })
            :
            <p>Loading...</p>
            }
        </div>
    );
};

export default Homepage;