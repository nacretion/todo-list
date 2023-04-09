import React from 'react';
import classes from "./button.module.scss"

const Button = ({children, func, sx, small, large}) => {
    const buttonClass = small ? classes.buttonSmall : large ? classes.buttonLarge : classes.button


    return (
        <button style={sx} className={buttonClass} onClick={(e) => func(e)}>
            {children}
        </button>
    );
};

export default Button;