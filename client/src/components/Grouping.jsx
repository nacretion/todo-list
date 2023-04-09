import React from 'react';
import classes from "./styles/grouping.module.scss"
import Button from "./UI/button/Button";

const Grouping = () => {
    return (
        <div className={classes.Grouping}>
            <p className={classes.heading}>Группировка</p>
            <Button small>По дате завершения</Button>
            <Button small>По ответственным</Button>
            <Button small>По обновлению</Button>
        </div>
    );
};

export default Grouping;