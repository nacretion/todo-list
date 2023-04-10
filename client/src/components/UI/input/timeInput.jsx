import React, {useState} from 'react';
import classes from "./Input.module.scss"
import {format, parse, set} from 'date-fns';

const TimeInput = ({value, setValue}) => {
    const [isHoverActive, setIsHoverActive] = useState(false);
    const [isFocusActive, setIsFocusActive] = useState(false);

    const handleFocus = () => {
        setIsFocusActive(true);
    };

    const handleBlur = () => {
        setIsFocusActive(false);
    };

    const handleHover = () => {
        setIsHoverActive(!isHoverActive);
    };

    const handleChange = (e) => {
        const input = e.target.value;
        const time = parse(input, 'HH:mm', new Date());
        if (!isNaN(time.getTime())) { // если время корректно
            setValue(format(time, 'HH:mm'));
        }
    }

    const handleHourChange = (e) => {
        const hour = parseInt(e.target.value);
        if (hour >= 0 && hour <= 23) { // проверяем корректность значения часов
            const time = parse(value, 'HH:mm', new Date());
            setValue(format(set(time, {hours: hour}), 'HH:mm')); // меняем значение часов
        }
    }

    const handleMinuteChange = (e) => {
        const minute = parseInt(e.target.value);
        if (minute >= 0 && minute <= 59) { // проверяем корректность значения минут
            const time = parse(value, 'HH:mm', new Date());
            setValue(format(set(time, {minutes: minute}), 'HH:mm')); // меняем значение минут
        }
    }

    return (
        <div className={classes.inputWrapper}>
            <input
                className={classes.hourInput}
                type="number"
                min="0"
                max="23"
                value={value.slice(0, 2)}
                onChange={handleHourChange}
            />
            <span>:</span>
            <input
                className={classes.minuteInput}
                type="number"
                min="0"
                max="59"
                value={value.slice(3, 5)}
                onChange={handleMinuteChange}
            />
        </div>

    );
};

export default TimeInput;
