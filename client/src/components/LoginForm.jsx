import React, {useContext} from 'react';
import Input from "./UI/input/Input";
import classes from "./styles/loginForm.module.scss"
import Button from "./UI/button/Button";
import {AuthContext} from "../context/AuthContext";
import {loginUser} from "../utils/UserUtils";

const LoginForm = () => {
    const { login, password, setUsername, setPassword } = useContext(AuthContext);
    const handleLogin = async () => {
        await loginUser(login, password).then(res => {
            if (res) {
                window.location.reload();
            }
        })

    };



    return (
        <div className={classes.LoginForm}>
            <Input type={"text"} value={login} setValue={setUsername}>
                Логин
            </Input>
            <Input type={"Password"} value={password} setValue={setPassword}>
                Пароль
            </Input>
            <Button sx={{marginTop: "30px"}} children={"Войти"} func={handleLogin}/>
        </div>
    );
};

export default LoginForm;