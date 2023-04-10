import React, {useState} from 'react';
import classes from "./styles/TaskWrapper.module.scss"
import Task from "./UI/task/Task";
import Loader from "./UI/loader/Loader";


const TaskWrapper = ({loading, tasks}) => {

    const renderTasks = () => {
        if (tasks) {
            return tasks.map((task)=>{

                return (
                    <Task key={task.id} task={task}/>
                )
            })
        } else {
            return <p style={{margin: "200px 0"}}>Нет никаких задач</p>
        }
    }

    return (
        <div className={classes.TaskWrapper}>
            {loading === "true" ? <Loader/> : renderTasks()}
        </div>
    );
};

export default TaskWrapper;