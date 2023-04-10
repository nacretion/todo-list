import React, { useEffect, useState } from 'react';
import classes from './styles/TaskWrapper.module.scss';
import Task from './UI/task/Task';
import Loader from './UI/loader/Loader';

const TaskWrapper = ({ loading, tasks }) => {
    const [taskCollection, setTaskCollection] = useState([]);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const renderedTasks = tasks.map((task) => {
                if (task && task.id) {
                    return <Task key={task.id} task={task} />;
                }
                return null;
            });
            setTaskCollection(renderedTasks);
        } else {
            setTaskCollection([
                <p key="no-tasks" style={{ margin: '200px 0' }}>
                    Нет никаких задач
                </p>,
            ]);
        }
    }, [tasks]);

    return (
        <div className={classes.TaskWrapper}>
            {loading === 'true' ? <Loader /> : taskCollection}
        </div>
    );
};

export default TaskWrapper;
