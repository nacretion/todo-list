import AuthProvider from "./context/AuthProvider";
import React, {useEffect, useState} from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {checkToken} from "./utils/UserUtils";
import VisibleProvider from "./context/VisibleProvider";
import Loader from "./components/UI/loader/Loader";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)



    useEffect(() => {

        checkToken().then(res => {
            setIsAuthenticated(res)
            setLoading(false)
        })


    },[])





    return (
            <BrowserRouter>
                <AuthProvider>
                    <VisibleProvider>
                        <Routes>
                            <Route exact path="/" element={isAuthenticated ? <Dashboard /> : loading? <Loader/> : <Login />}>
                            </Route>
                        </Routes>
                    </VisibleProvider>
                </AuthProvider>
            </BrowserRouter>
    );
}

export default App;
