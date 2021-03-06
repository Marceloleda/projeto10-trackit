import styled from "styled-components";
import TodayDate from "./TodayDate";
// import LoadingSpin from "react-loading-spin";
import {useState, useEffect } from "react";
import axios from "axios";
import check from "../Assets/img/check.png"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';




export default function TelaHoje(){
    const [habits, setHabits] = useState ([]);
    const [numPorcentage, setNumPorcentage] = useState();
    
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('TokenLogin')}` }
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
                                <img src={check} alt="check" />
                            </BotaoCheck>
                        </Habitos>
                    </>
                );
            })
        }
        return(
            <>
                <NoHabts>
                    <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1>
                </NoHabts>
            </>
        );
        
    }
    const value = 0;

    return(
        <>
            <Conteiner>
                <Empurra></Empurra>
                <TodayDate />
                {showHabits()}

                <Porcentagem > 
                    <CircularProgressbar value={value} maxValue={numPorcentage} text='Hoje' />
                </Porcentagem>

            </Conteiner>
        </>
    );
}
const Porcentagem = styled.div`
    margin-top: 270px;
    margin-left: 120px;
    width: 100px; 
    height: 100px;
`;
const Conteiner = styled.div`
    height: 585px;
    background: #F2F2F2;
    padding: 18px;
    box-sizing: border-box;
`;
const Empurra = styled.div`
    height:110px;
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