import React, { useState } from 'react';
import classes from "./Input.module.scss"

const Input = ({type, children, value, setValue, textField}) => {
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

    return (
        <div className={classes.inputWrapper}>
            {textField?
                <textarea
                    rows={3}
                    className={classes.input}
                    style={{borderBottom: isFocusActive || isHoverActive ? '1px solid #AF49FF' : '1px solid rgba(175, 73, 255, 0.4)'}}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onMouseOver={handleHover}
                    onMouseLeave={handleHover}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}

                />
                :
                <input
                    className={classes.input}
                    style={{borderBottom: isFocusActive || isHoverActive ? '1px solid #AF49FF' : '1px solid rgba(175, 73, 255, 0.4)'}}
                    type={type}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onMouseOver={handleHover}
                    onMouseLeave={handleHover}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}

                />
            }
            <div

                className={classes.inputLabel}
                style={{
                    top: isFocusActive || isHoverActive || value ? '0' : '10px',
                    fontSize: isFocusActive || isHoverActive || value ? '10px' : '25px'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Input;
