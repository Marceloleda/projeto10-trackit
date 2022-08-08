import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import Top from "./Top";
import Menu from "./Menu";
import DateTop from "./DateTop";
import axios from "axios";



export default function Today(){
    const [habits, setHabits] = useState ([]);
    const [numPorcentage, setNumPorcentage] = useState();

    const {tasks, setTasks} = useContext(UserContext);

    const config = {
        headers: { Authorization: `Bearer ${tasks.token}` }
    };
    useEffect(() => {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
        promise.then(response => {
            console.log(response.data)
            setHabits(response.data)
            setNumPorcentage(habits.length)
        })
        promise.catch((err) => {
            console.log('deu erro')
            console.log(err.message)
        })
    },[])
    
    function showHabits(){
        if(habits.length > 0){
            habits.map((habts) => {
                return(
                    <>
                        <Habitos>
                            <h1>{habts.name}</h1>
                            <h2>Sequência atual:{habts.currentSequence}</h2>
                            <h2>Seu recorde:{habts.highestSequence}</h2>
                            <BotaoCheck>
                                <img src="" alt="check" />
                            </BotaoCheck>
                        </Habitos>
                    </>
                );
            })
        }
        else{
            return(
                <>
                    <NoHabts>
                        <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1>
                    </NoHabts>
                </>
            );
        }
        
    }
    return(
        <> 
            <CostaTopo/>
            <Top/>
            <Conteiner>
                <DateTop/>
                {showHabits()}

            </Conteiner>
            <Menu/>
        </>
    );
}
const Conteiner = styled.div`
    padding: 18px;
    box-sizing: border-box;
`;
const CostaTopo = styled.div`
    height: 70px;
`;

const Porcentagem = styled.div`
    margin-top: 270px;
    margin-left: 120px;
    width: 100px; 
    height: 100px;
`;

const Habitos = styled.div`
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
`;
const BotaoCheck=styled.div`
    width: 69px;
    height: 69px;
    background: #8FC549;
    border-radius: 5px;
`;
const NoHabts = styled.div`
    height: 74px;
    h1{
        font-family: 'Lexend Deca';
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;