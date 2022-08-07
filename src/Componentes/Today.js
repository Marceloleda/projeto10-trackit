import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import Top from "./Top";




export default function Today(){
    const {tasks, setTasks} = useContext(UserContext);
    return(
        <> 
            <Top/>
            <Conteiner>

                <h1>today</h1>
            </Conteiner>
        </>
    );
}
const Conteiner = styled.div`
    height: 100%;
    background: #F2F2F2;
    padding: 18px;
    box-sizing: border-box;
`;