import React, {useContext, useEffect, useState} from 'react';
import classes from "../styles/Dashboard.module.scss"
import Grouping from "../components/Grouping";
import TaskWrapper from "../components/TaskWrapper";
import {getTasksByResponsibleId} from "../utils/TaskUtils";
import {AuthContext} from "../context/AuthContext";
import Button from "../components/UI/button/Button";

const Dashboard = () => {
    const [grouping, setGrouping] = useState(0);
    const {slaves} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const userId = parseInt(localStorage.getItem("user_id"));
        const subordinateIds = slaves.map(slave => slave.subordinate_id);
        const allIds = [userId, ...subordinateIds];
        const tasksPromises = allIds.map(id => getTasksByResponsibleId(id));

        Promise.all(tasksPromises)
            .then(tasksByUser => {
                const allTasks = tasksByUser.flat();
                setLoading(false);
                setTasks(allTasks);
            })
            .catch((error) => console.error(error));
    }, [slaves]);



    const handleLogout = () => {
        localStorage.setItem("user_id", "");
        localStorage.setItem("token", "");
        window.location.reload();
    };

    return (
        <div className={classes.Dashboard}>
            <p className={"heading"}>задачи</p>
            <Grouping active={grouping} setActive={setGrouping}/>
            <TaskWrapper loading={loading.toString()} tasks={tasks} grouping={grouping}/>

            <Button func={handleLogout}>Выйти</Button>
        </div>
    );
};

export default Dashboard;
