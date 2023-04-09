import React from 'react';
import classes from "../styles/Login.module.scss"
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div className={classes.Login}>
            <p className={"heading"}>todos</p>
            <LoginForm/>
            <p className={classes.text}>forgot password?<br/>contact to your manager </p>
        </div>
    );
};

export default Login;