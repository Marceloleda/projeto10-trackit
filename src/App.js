import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./Componentes/Login";
import Registration from "./Componentes/Registration";
import Today from "./Componentes/Today"
import UserContext from "./contexts/UserContext";


export default function App(){
    const [tasks, setTasks] = useState([]);
    const contextValue = { tasks, setTasks };

    return(
        <>
            <GlobalStyle/>
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/cadastro" element={<Registration/>}/>
                        <Route path="/hoje" element={<Today/>}/>

                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
    body{
        width: 375px;
    }
`