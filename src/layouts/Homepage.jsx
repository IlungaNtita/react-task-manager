import Item from "../components/kanban/Item";
import DropWrapper from "../components/kanban/DropWrapper";
import Col from "../components/kanban/Col";
import { data, statuses } from "../data";
import { useState } from "react";
// import Card from "@mui/material/Card";
// Focus React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

const Homepage = ({setTasks, tasks}) => {
    const [titleInput, setTitleInput] = useState("");
    const [contentInput, setContentInput] = useState("");

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
                            <h2 className="col-header">{s.status.toUpperCase()}</h2>
                            <DropWrapper onDrop={onDrop} status={s.status}>
                                <Col>
                                {tasks
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Item titleInput={titleInput} 
                                                        contentInput={contentInput}
                                                        setTitleInput={setTitleInput} 
                                                        setContentInput={setContentInput}
                                                        key={i.id} 
                                                        item={i} 
                                                        index={idx} 
                                                        moveItem={moveItem} 
                                                        status={s} 
                                                        tasks={tasks} 
                                                        setTasks={setTasks}/>
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