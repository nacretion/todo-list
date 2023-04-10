import React, {useContext, useEffect, useState} from 'react';
import classes from './styles/TaskWrapper.module.scss';
import Task from './UI/task/Task';
import Loader from './UI/loader/Loader';
import CreateTaskModal from "./UI/modal/createTaskModal";
import Button from "./UI/button/Button";
import {AuthContext} from "../context/AuthContext";
import {getAbbreviated} from "../utils/UserUtils";

const TaskWrapper = ({loading, tasks, grouping}) => {
    const [taskCollection, setTaskCollection] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);
    const [weekTasks, setWeekTasks] = useState([]);
    const [soonTasks, setSoonTasks] = useState([]);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [groupByResponsible, setGroupByResponsible] = useState([]);
    const [addMode, setAddMode] = useState(false)
    const {slaves} = useContext(AuthContext)

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const renderedTasks = tasks.map((task) => {
                if (task && task.id) {
                    return <Task key={task.id} task={task}/>;
                }
                return null;
            });
            setTaskCollection(renderedTasks);
        } else {
            setTaskCollection([
                <p key="no-tasks" style={{margin: '200px 0'}}>
                    Нет никаких задач
                </p>,
            ]);
        }
    }, [tasks]);

    useEffect(() => {
        const collection = taskCollection.filter(task => task)
        if (collection.length > 0 && collection[0].props && collection[0].props.task) {
            setTodayTasks(collection.filter(
                    (task) =>

                        new Date(task.props.task.end_date) < new Date(new Date().setHours(24, 0, 0, 0))
                )
            )
            setWeekTasks(collection.filter(
                    (task) =>

                        new Date(task.props.task.end_date) > new Date(Date.now()) &&
                        new Date(task.props.task.end_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                )
            )
            setSoonTasks(collection.filter((task) => new Date(task.props.task.end_date) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)))

            setSortedTasks(collection.sort((a, b) => new Date(b.props.task.upd_date) - new Date(a.props.task.upd_date)))
            getTasksByAbbreviated(collection)
        }
    }, [taskCollection])

    console.log(groupByResponsible)

    const getTasksByAbbreviated = (collection) => {
        if (slaves.length) {
            const promises = slaves.map((slave) => {
                return getAbbreviated(slave.subordinate_id).then((r) => {
                    const obj = { name: r.name, taskCol: collection.filter(task => task.props.task.responsible_id === slave.subordinate_id) };
                    const index = groupByResponsible.findIndex(x => x.name === r.name);
                    if (index !== -1) {
                        groupByResponsible[index] = obj;
                    } else {
                        groupByResponsible.push(obj);
                    }
                });
            });
            return Promise.all(promises).then(() => setGroupByResponsible([...groupByResponsible]));
        }
    }







    const renderTasks = (grouping) => {
        switch (grouping) {
            case 0: {
                return (
                    <>
                        <p>Сегодня</p>
                        {todayTasks}
                        <p>На неделю</p>
                        {weekTasks}
                        <p>На будущее</p>
                        {soonTasks}
                    </>
                )
            }
            case 1: {
                return (
                    groupByResponsible.map((resp) => {
                        return (
                            <>
                                <p>{resp.name}</p>
                                {resp.taskCol}
                            </>
                        )
                    })
                )
            }
            case 2: {
                return (
                    sortedTasks
                )
            }
        }
    }

    return (
        <>
            {
                slaves[0] ?
                    <>
                        <Button func={() => {
                            setAddMode(!addMode)
                        }} small>
                            Создать задачу
                        </Button>
                        <CreateTaskModal active={addMode} setActive={setAddMode}/>
                    </>
                    : ""
            }


            <div className={classes.TaskWrapper}>
                {loading === 'true' ? <Loader/> : renderTasks(grouping)}
            </div>
        </>
    );
};

export default TaskWrapper;
