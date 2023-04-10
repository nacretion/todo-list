import React, {useContext, useEffect, useState} from "react";
import {getAbbreviated} from "../../../utils/UserUtils";
import Button from "../button/Button";
import Modal from "./Modal";
import classes from "./ModalTask.module.scss"
import {getStatus, updateTask} from "../../../utils/TaskUtils";
import Input from "../input/Input";
import TimeInput from "../input/timeInput";
import Switch from "../switch/Switch";
import {AuthContext} from "../../../context/AuthContext";

const CreateTaskModal = ({task, active, setActive, editMode, setEditMode}) => {

    const [heading, setHeading] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [responsible, setResponsible] = useState("")
    const [creator, setCreator] = useState("")
    const [endDate, setEndDate] = useState(new Date(Date.now()))
    const [priority, setPriority] = useState("")
    const [createDate, setCreateDate] = useState()

    const {slaves} = useContext(AuthContext)

    const [slavesArray, setSlavesArray] = useState([])
    const [selectedSlave, setSelectedSlave] = useState(0)

    useEffect(() => {
        if (task) {
            const {
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


            setHeading(heading)
            setDescription(description)
            setStatus(status)
            setPriority(priority)
            setCreateDate(new Date(create_date).toLocaleString('ru-RU'))
            setEndDate(new Date(end_date).toLocaleString('ru-RU'))

            getSlaves()
            getAbbreviated(creator_id).then(name =>
                setCreator(name.name)
            )
            getAbbreviated(responsible_id).then(name =>
                setResponsible(name.name)
            )
        }
    }, [])
    const statusString = getStatus(status)


    const formatDate = () => {
        const date = new Date(endDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`
    }
    const formatTime = () => {
        const date = new Date(endDate);
        const hour = ('0' + (date.getHours() + 1)).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        return `${hour}:${minute}`
    }

    const [fomattedDate, setFormattedDate] = useState(formatDate())
    const [updTime, setUpdTime] = useState(formatTime())


    const getSlaves = () => {
        let res = [];
        slaves.map(async (slave) => {
            const id = slave.subordinate_id
            res.push({id: slaves.indexOf(slave), init_id: id, text: (await getAbbreviated(id)).name})
        })
        setSlavesArray(res)
    }

    const [updatedTask, setUpdatedTask] = useState()

    const collectUpdates = () => {
        const end_date = (new Date(fomattedDate + " " + updTime))
        return {
            id: task.id,
            heading: heading,
            description: description,
            endDate: end_date,
            priority: priority,
            status: status,
            responsibleId: slavesArray[selectedSlave].init_id
        }
    }


    const handleEdit = () => {
        updateTask(collectUpdates()).then(r => {
            if (r.id) {
                window.location.reload()
            }
        })
    }

    return (
        <Modal active setActive={setActive}>
            <div className={classes.content}>
                <div className={classes.line}>
                    <div className={classes.row}>
                        <Input type={"text"} value={heading} setValue={setHeading}>
                            Заголовок
                        </Input>
                    </div>
                    <div className={classes.row}>
                        <Input textField type={"text"} value={description} setValue={setDescription}>
                            Описание
                        </Input>
                    </div>
                </div>
                <div className={classes.line}>
                    <div className={classes.row}>
                        <span>Создано</span>
                        <p>{creator}</p>
                    </div>
                    <div className={classes.row}>
                        <span>Ответственный</span>
                        <Switch
                            options={slavesArray}
                            selectedValue={selectedSlave}
                            setSelectedValue={setSelectedSlave}
                        />
                    </div>
                    <div className={classes.row}>
                        <span>Крайний срок</span>
                    </div>
                    <div style={{justifyContent: "flex-start"}} className={classes.row}>
                        <Input type={"date"} value={fomattedDate} setValue={setFormattedDate}></Input>
                        <TimeInput value={updTime} setValue={setUpdTime}/>
                    </div>
                </div>

                <div className={classes.line}>
                    <Switch
                        options={[
                            {id: 0, text: 'К выполнению'},
                            {id: 1, text: 'Выполняется'},
                            {id: 2, text: 'Выполнена'},
                            {id: 3, text: 'Отменена'},
                        ]}
                        selectedValue={status}
                        setSelectedValue={setStatus}

                    />
                    <div className={classes.row}>
                        <Button func={()=> setEditMode(!editMode)}>Отменить</Button>
                        <Button func={()=> handleEdit()}>Принять</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CreateTaskModal;