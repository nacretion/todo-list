import React, {useContext, useEffect, useState} from "react";
import {getAbbreviated} from "../../../utils/UserUtils";
import Button from "../button/Button";
import Modal from "./Modal";
import classes from "./ModalTask.module.scss"
import {updateTask} from "../../../utils/TaskUtils";
import Input from "../input/Input";
import TimeInput from "../input/timeInput";
import Switch from "../switch/Switch";
import {AuthContext} from "../../../context/AuthContext";
import Priority from "../priority/Priority";

const CreateTaskModal = ({task, active, setActive}) => {

    const [heading, setHeading] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState(0)
    const [responsible, setResponsible] = useState("")
    const [creator, setCreator] = useState("")
    const [endDate, setEndDate] = useState(new Date(Date.now()))
    const [priority, setPriority] = useState(0)
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
    }, [task])

    useEffect(() => {
        getSlaves()
    }, [slaves])



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


    const getSlaves = async () => {
        const id = parseInt(localStorage.getItem("user_id"));
        const slavePromises = slaves.map((slave) => getAbbreviated(slave.subordinate_id));
        const slaveResults = await Promise.all(slavePromises);
        const slaveArray = slaveResults.map((result, index) => ({
            id: index,
            init_id: slaves[index].subordinate_id,
            text: result.name,
        }));
        setSlavesArray([...slaveArray]);
    };


    const collectUpdates = () => {
        const end_date = (new Date(fomattedDate + " " + updTime))
        if (task) {
            return {
                id: task.id,
                heading: heading,
                description: description,
                endDate: end_date,
                priority: priority,
                status: status,
                responsibleId: slavesArray[selectedSlave].init_id
            }
        } else {
            return {
                creatorId: slaves[0].chief_id,
                heading: heading,
                description: description,
                endDate: end_date,
                priority: priority,
                status: status,
                responsibleId: slavesArray[selectedSlave].init_id
            }
        }
    }


    const handleEdit = () => {
        console.log(collectUpdates())
        if (heading && description && endDate && slavesArray[selectedSlave].init_id) {

            updateTask(collectUpdates()).then(r => {
                if (r) {
                    window.location.reload()
                }
            })
        } else {
            alert("blank fields")
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
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
                    <div style={{justifyContent: "flex-start", alignItems: "flex-end"}} className={classes.row}>
                        <Input type={"date"} value={fomattedDate} setValue={setFormattedDate}></Input>
                        <TimeInput value={updTime} setValue={setUpdTime}/>
                    </div>
                </div>

                <div className={classes.line}>
                    <div className={classes.row}>
                        <Priority setPriority={setPriority} priority={priority}/>
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
                    </div>
                    <div className={classes.row}>
                        <Button func={() => setActive(!active)}>Отменить</Button>
                        <Button func={() => handleEdit()}>Принять</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CreateTaskModal;