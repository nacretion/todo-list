import React, {useEffect, useState} from 'react';
import classes from "./Task.module.scss"
import {getAbbreviated} from "../../../utils/UserUtils";
import {getStatus} from "../../../utils/TaskUtils";
import cx from "classnames"
import ModalTask from "../modal/ModalTask";
import Priority from "../priority/Priority";

const Task = ({task}) => {
    const {
        id,
        heading,
        status,
        responsible_id,
        end_date,
        priority
    } = task;

    const [resp, setResp] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [isOverdue, setIsOverdue] = useState(false)

    useEffect(  () => {
        getAbbreviated(responsible_id).then(name =>
            setResp(name.name)
        )
    }, [])

    const statusString = getStatus(status)
    const endDate =  new Date(end_date).toLocaleDateString('ru-RU');


    const [active, setActive] = useState(false)

    useEffect(()=> {
        if (new Date(end_date).getTime() < Date.now()) {
            setIsOverdue(true)
        }
    },[end_date])


    const getClasses = () => {
        return (
            statusString === "Выполнена" ?
                cx(classes.task, classes.completed)
                : isOverdue? cx(classes.task, classes.overdue)
                    : classes.task
        )
    }
    return (
        <>
            <div key={id} onClick={() => setActive(!active)} className={getClasses()}>
                <div className={classes.line}>
                    <Priority priority={priority}/>
                    <p className={classes.heading}>{heading}</p>
                </div>
                <div className={classes.line}>
                    <p className={classes.status}>{statusString}</p>
                </div>
                <div className={classes.line} style={{justifyContent:"space-between"}}>
                    <p className={classes.responsible}>{resp}</p>
                    <p className={classes.endDate}>{endDate}</p>
                </div>
            </div>

            <ModalTask editMode={editMode} setEditMode={setEditMode} active={active} key={`modal-${id}`} setActive={setActive} task={task}/>
        </>
    );
};

export default Task;