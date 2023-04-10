import React, {useContext} from 'react';
import classes from "./styles/grouping.module.scss"
import Button from "./UI/button/Button";
import {AuthContext} from "../context/AuthContext";

const Grouping = ({setActive}) => {
    const {slaves} = useContext(AuthContext)
    return (
        <div className={classes.Grouping}>
            <p className={classes.heading}>Группировка</p>
            <Button func={() => setActive(0)} small>По дате завершения</Button>
            { slaves[0] ? <Button func={() => setActive(1)} small>По ответственным</Button>
                : ""
            }

            <Button func={() => setActive(2)} small>По обновлению</Button>
        </div>
    );
};

export default Grouping;