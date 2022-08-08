import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./Componentes/Login";
import Registration from "./Componentes/Registration";
import Today from "./Componentes/Today"
import Habits from "./Componentes/Habits";
import UserContext from "./contexts/UserContext";
import Historic from "./Componentes/Historic";


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
                        <Route path="/habitos" element={<Habits/>}/>
                        <Route path="/historico" element={<Historic/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
    body{
        width: 375px;
        Height:667px;
        background: #E5E5E5;
        font-family: 'Lexend Deca', sans-serif;

    }
`