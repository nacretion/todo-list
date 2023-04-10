import React, {useContext, useEffect, useState} from "react";
import {getAbbreviated} from "../../../utils/UserUtils";
import Button from "../button/Button";
import Modal from "./Modal";
import classes from "./ModalTask.module.scss"
import {getStatus} from "../../../utils/TaskUtils";
import CreateTaskModal from "./createTaskModal";
import {AuthContext} from "../../../context/AuthContext";

const ModalTask = ({task, active, setActive}) => {
    const {
        id,
        heading,
        description,
        status,
        responsible_id,
        creator_id,
        create_date,
        upd_date,
        end_date,
        priority
    } = task;


    const userId = parseInt(localStorage.getItem("user_id"))
    const [isOverdue, setIsOverdue] = useState(false)

    useEffect(() => {
        if (new Date(end_date).getTime() < Date.now()) {
            setIsOverdue(true)
        }
    }, [end_date])

    const [resp, setResp] = useState("")
    const [creator, setCreator] = useState("")


    useEffect(() => {
        getAbbreviated(creator_id).then(name =>
            setCreator(name.name)
        )
        getAbbreviated(responsible_id).then(name =>
            setResp(name.name)
        )
    }, [])

    const endDate = new Date(end_date).toLocaleString('ru-RU');
    const updDate = new Date(upd_date).toLocaleString('ru-RU');
    const createDate = new Date(create_date).toLocaleString('ru-RU');

    const statusString = getStatus(status)

    const [editMode, setEditMode] = useState(false)

    return (
        !editMode?
        <Modal active={active} sx={isOverdue ? {borderColor: "red"} : {}} setActive={setActive}>
            <div className={classes.content}>
                <div>
                    <div className={classes.line}>
                        <p className={classes.heading} style={isOverdue ? {color: "red"} : {}}>{heading}</p>

                        <p className={classes.description}>{description}</p>
                    </div>

                </div>
                <div className={classes.line}>
                    <div className={classes.row}>
                        <p>Создано</p>
                        <p>{creator}</p>
                    </div>
                    <div className={classes.row}>
                        <p>Ответственный</p>
                        <p>{resp}</p>
                    </div>
                </div>
                <div className={classes.line}>
                    <div className={classes.row}>
                        <p>Создано</p>
                        <p>{createDate}</p>
                    </div>
                    <div className={classes.row}>
                        <p>Обновлено</p>
                        <p>{updDate}</p>
                    </div>
                    <div className={classes.row} style={isOverdue ? {borderColor: "red"} : {}}>
                        <p style={isOverdue ? {color: "red"} : {}}>Крайний срок</p>
                        <p style={isOverdue ? {color: "red"} : {}}>{endDate}</p>
                    </div>
                </div>
                <div className={classes.line}>
                    <p className={classes.status} style={isOverdue ? {color: "red"} : {}}>{statusString}</p>
                    <div className={classes.row}>
                        {userId === creator_id ?
                            <Button func={() => setEditMode(!editMode)}>Редактировать</Button>
                            :<br/>
                        }
                        <Button>Принять</Button>
                    </div>
                </div>
            </div>
        </Modal>
            :
            <CreateTaskModal editMode={editMode} setEditMode={setEditMode} task={task}/>
    )
}

export default ModalTask;