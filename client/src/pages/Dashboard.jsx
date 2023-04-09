import React, {useEffect, useState} from 'react';
import classes from "../styles/Dashboard.module.scss"
import Grouping from "../components/Grouping";
import TaskWrapper from "../components/TaskWrapper";
import {getTasksByResponsibleId} from "../utils/TaskUtils";

const Dashboard = () => {
    const getTasks = () => {
        // TODO: change id to variable, not const
        getTasksByResponsibleId(2)
            .then(tasks => {
                setLoading(false)
                setTasks(tasks)
            })
            .catch(error => console.error(error));
    }

    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState()

    useEffect(() => {
        getTasks()
    },[])

    return (
        <div className={classes.Dashboard}>
            <p className={"heading"}>задачи</p>
            <Grouping/>
            <TaskWrapper loading={loading.toString()} tasks={tasks}/>
        </div>
    );

};

export default Dashboard;