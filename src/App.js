import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./Componentes/Login";
import Registration from "./Componentes/Registration";
import UserContext from "./contexts/UserContext";


export default function App(){
    return(
        <>
            <GlobalStyle/>
            <UserContext.Provider >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/cadastro" element={<Registration/>}/>
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