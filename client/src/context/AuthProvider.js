import {useEffect, useState} from 'react';
import { AuthContext } from './AuthContext';
import {getSlavesByBossId} from "../utils/UserUtils";

const AuthProvider = ({ children }) => {
    const [login, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // slaves xD
    const [slaves, setSlaves] = useState([])

    const getSlaves = async () => {
        const userId = localStorage.getItem("user_id")
        if (userId)
            await getSlavesByBossId(userId).then((slaves) => {
                setSlaves(slaves)
            })
    }

    useEffect(() => {
        getSlaves()

    }, [])


    const authValues = {
        login,
        password,
        setUsername,
        setPassword,
        slaves,
        setSlaves
    };

    return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
