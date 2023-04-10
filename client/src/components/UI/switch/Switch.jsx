import React from 'react';
import classes from "./Switch.module.scss"

const Switch = ({options, selectedValue, setSelectedValue}) => {

    return (
        <select className={classes.Switch} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
            {options.map((option) =>
                <option key={option.id} value={option.id}>{option.text}</option>
            )}
        </select>
    );
};

export default Switch;
