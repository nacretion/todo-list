import React, {useContext, useEffect, useState} from 'react';
import classes from "../styles/Dashboard.module.scss"
import Grouping from "../components/Grouping";
import TaskWrapper from "../components/TaskWrapper";
import {getTasksByResponsibleId} from "../utils/TaskUtils";
import {AuthContext} from "../context/AuthContext";
import Button from "../components/UI/button/Button";

const Dashboard = () => {
    const getTasks = () => {
        const id = parseInt(localStorage.getItem("user_id"))
        getTasksByResponsibleId(id)
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
        <div  className={classes.Dashboard}>
            <p className={"heading"}>задачи</p>
            <Grouping/>
            <TaskWrapper loading={loading.toString()} tasks={tasks}/>
            <Button func={() => {
                localStorage.setItem("user_id", "")
                localStorage.setItem("token", "")
                window.location.reload();
            }}>Выйти</Button>
        </div>
    );

};

export default Dashboard;