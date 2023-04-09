import React, {useEffect, useState} from 'react';
import classes from "./Task.module.scss"
import {getAbbreviated} from "../../../utils/UserUtils";
import {getStatus} from "../../../utils/TaskUtils";
import cx from "classnames"
const Task = ({task}) => {
    // TODO: use priority (write a component)
    const {
        id,
        heading,
        status,
        responsible_id,
        end_date
        // priority
    } = task;

    const [resp, setResp] = useState("")
    const [isOverdue, setIsOverdue] = useState("")

    useEffect(  () => {
        getAbbreviated(responsible_id).then(name =>
            setResp(name.name)
        )
    }, [])

    const statusString = getStatus(status)
    const endDate =  new Date(end_date).toLocaleDateString('ru-RU');



    useEffect(()=> {
        if (new Date(end_date).getTime() < Date.now()) {
            setIsOverdue(true)
        }
    },[])

    return (
        <div key={id} className={isOverdue? cx(classes.task, classes.overdue) : classes.task}>
            <div className={classes.line}>
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
    );
};

export default Task;