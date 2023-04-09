import AuthProvider from "./context/AuthProvider";
import React, {useEffect, useState} from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {checkToken} from "./utils/UserUtils";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)



    useEffect(() => {
        checkToken().then(res => {
            setIsAuthenticated(res)
        })
    },[])


    return (
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route exact path="/" element={isAuthenticated ? <Dashboard /> : <Login />}>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
    );
}

export default App;
