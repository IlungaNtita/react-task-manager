import Item from "../components/kanban/Item";
import DropWrapper from "../components/kanban/DropWrapper";
import Col from "../components/kanban/Col";
import { statuses } from "../data";
// import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import SprintCarousel from "components/kanban/SprintCarousel";
import Grid from "@mui/material/Grid";

import { useQuery } from "@apollo/client";
import { WHOAMI, SPRINT } from "graphql/queries";

const Homepage = ({
    taskData, 
    createTask,
    updateTask,
    updateTaskTime,
    deleteTask,
    activeSprint,
    setActiveSprint}) => {
    const { loading:whoAmILoading, data:whoAmIData } = useQuery(WHOAMI, { errorPolicy: 'all' });
    const [tasks, setTasks] = useState(taskData)
    const [updated, setUpdated] = useState(false)
    const [created, setCreated] = useState(false);
    const { loading:sprintLoading, error:sprintError, data:sprintData, refetch: refetchSprint} = useQuery(SPRINT, { 
        variables:{
            sprintId:activeSprint
        },
    errorPolicy: 'all' });

    useEffect(() => { 
        if(sprintData && sprintData.sprint){
            refetchSprint()
            setTasks(sprintData.sprint.taskSet)
        }
    }, [activeSprint])

    useEffect(() => {
            setTasks(taskData);
            console.log("useEffect")
    }, [sprintData])

    useEffect(() => {
    	// update tasks once an tem has been updated
        if(updated === true || created === true){
            setTasks(taskData);
            console.log(taskData)
            setUpdated(false)
            setCreated(false)
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
        <div>
            {!whoAmILoading && whoAmIData && whoAmIData.whoami?
            <SprintCarousel 
            sprints={whoAmIData.whoami.sprintSet} 
            activeSprint={activeSprint}
            key={activeSprint}
            setActiveSprint={setActiveSprint}/>
            :
            <div className="loader mb-5"></div>}
                {activeSprint !== 0?<Grid container justifyContent="center" className="mb-5" >
                    <Grid container justifyContent="center" className="mb-5" lg={10}>
                    { statuses ?
                        statuses.map(s => {
                            return (
                                <Grid item xs={10} lg={4}>
                                    <div style={{ width:300 }} className="ml-3">

                                        <MDTypography variant="h1" sx={{ fontSize: 18 }}  gutterBottom>
                                            {s.status.toUpperCase()}
                                        </MDTypography>
                                        
                                        <DropWrapper onDrop={onDrop} status={s.status}>
                                            {sprintLoading?
                                            <div></div>:
                                            <Col
                                            key={s.status}
                                            createTask={createTask} 
                                            setTasks={setTasks} 
                                            tasks={tasks} 
                                            taskData={taskData} 
                                            activeSprint={activeSprint}
                                            created={created}
                                            setCreated={setCreated}
                                            > 
                                            {tasks
                                                .filter(i => i.status === s.status)
                                                .map((i, idx) => 
                                                <Item
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
                                                    updateTaskTime={updateTaskTime}
                                                    deleteTask={deleteTask}
                                                    updated={updated}
                                                    setUpdated={setUpdated}
                                                    activeSprint={activeSprint} 
                                                    setActiveSprint={setActiveSprint}
                                                    />
                                                )}
                                            </Col>}
                                        </DropWrapper>
                                    </div>
                                </Grid>
                            )
                        })
                    :
                    <div className="loader"></div>
                    }
                    </Grid>
                </Grid>
                :
                <MDTypography display="block" variant="button" fontWeight="medium">
                Please select a Sprint, or add a new sprint.
                </MDTypography>}
            {/* </div> */}
        </div>
    );
};

export default Homepage;