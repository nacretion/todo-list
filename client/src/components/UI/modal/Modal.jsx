import React, {useContext, useEffect, useState} from 'react';
import classes from "./Modal.module.scss"
import cx from "classnames"
import {VisibleContext} from "../../../context/VisibleContext";

const Modal = ({active, setActive, children, sx}) => {

    const {scrollY} = useContext(VisibleContext)
    const handleClick = (e) => {
        if (setActive) {
            if (e.target.className.includes("Modal_Modal_")) {
                setActive(!active)
            }
        }
    }
    return (
        <div style={{top: scrollY + "px"}} onClick={handleClick} className={cx(classes.Modal, active? "" : classes.inactive)}>
            <div style={sx} className={classes.ModalContent}>
                {children}
            </div>
        </div>
    );
};




export default Modal;