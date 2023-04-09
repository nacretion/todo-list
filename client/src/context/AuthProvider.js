import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [login, setUsername] = useState('');
    const [password, setPassword] = useState('');




    const authValues = {
        login,
        password,
        setUsername,
        setPassword,
    };

    return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
