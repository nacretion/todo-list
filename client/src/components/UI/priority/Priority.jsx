import React from 'react';
import classes from "./Priority.module.scss"

const Priority = ({priority, setPriority}) => {

    const styles = [
        {
            backgroundColor: "rgba(0, 133, 255, 0.8)"
        },
        {
            backgroundColor: "rgba(112, 255, 0, 0.8)"
        },
        {
            backgroundColor: "rgba(255, 122, 0, 0.8)"
        }
    ]
    const handleClick = () => {
        if (priority + 1 > 2 ) {
            setPriority(0)
        } else {
            setPriority(priority+1)
        }
    }
    const getTitle = () => {
        switch (priority) {
            case 0: return "Низкий"
            case 1: return "Средний"
            case 2: return "Высокий"
        }
    }

    return (
        <article title={getTitle()} onClick={setPriority? ()=> handleClick() : () => {}} style={styles[priority] || styles[0]} className={classes.Priority}>

        </article>
    );
};

export default Priority;