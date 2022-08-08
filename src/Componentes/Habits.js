import Top from "./Top";
import Menu from "./Menu";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';

import Lixo from "../Assets/img/lixo.svg"

export default function Habits(){
    const {tasks} = useContext(UserContext);
    const [habitoCriado, setHabitoCriado] = useState(false);
    const [diaSelecionado, setDiaSelecionado] =useState([])
    const [dia, setDia] = useState(false);
    const [habits, setHabits] = useState([]);
    const [removeLoad, setRemoveLoad] = useState(false);
    const [ createHabits, setCreateHabits] = useState({
        nome:""
    });

    const config = {
        headers: { Authorization: `Bearer ${tasks.token}` }
    };
    const checkDays = [
        {id: 0, name: 'D'},
        {id: 1, name: 'S'},
        {id: 2, name: 'T'},
        {id: 3, name: 'Q'},
        {id: 4, name: 'Q'},
        {id: 5, name: 'S'},
        {id: 6, name: 'S'}    
    ];

    useEffect(() => {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
        promise.then(response => {
            console.log(response.data)
            setHabits(response.data)
        })

        promise.catch((err) => {
            console.log('deu erro')
            console.log(err.message)
        })
    },[])

    function showHabits(){
        if(habits.length > 0){

            return(
                <>
                    <TarefasHabitos>
                        {habits.map((day, index)=>{
                            return(
                                <>
                                    <HabitosFazer key={index}>
                                        <h1>{day.name}</h1>
            
                                            <Caixinhas>
                                                {checkDays.map((dias, index)=> 
                                                    
                                                    <CheckBoxMarcada key={index} cor={day.days} >
                                                        {dias.name}
                                                    </CheckBoxMarcada>)}
                                            </Caixinhas>
                                    </HabitosFazer>
                                </>
                            );
                        }
                        )}
                    </TarefasHabitos>
                </>
            );
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

    function nameTask(event){
        event.preventDefault();
        setRemoveLoad(true);
        
        if(diaSelecionado.length > 0 ){
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;

            const promise = axios.post(URL, {
                name: createHabits.nome,
                days: diaSelecionado.map(dia => dia.id)
            }, config);
            
    
            promise.then((response) => {
                console.log('deu certo')
                console.log(response);
                setRemoveLoad(false);
                alert("Nova rotina criada!")
                setHabitoCriado(!habitoCriado)
                setDiaSelecionado([])
                setCreateHabits("")

            })
    
            promise.catch((err) => {
                console.log('deu ruim')
                console.log(err.message)
                setRemoveLoad(false);
            })
        }
        else {
            alert('Selecione pelo menos um dia da semana!');
        }
    }

    function selecionadoDia(id) {
        const jaSelecionado = diaSelecionado.some(dia => dia.id === id);
        if (!jaSelecionado) {
          setDiaSelecionado([...diaSelecionado, {id}]);
        } else {
          const novosDias = diaSelecionado.filter(dia => dia.id !== id);
          setDiaSelecionado(novosDias);
        }
    }

    function criarHabito(){
        if( habitoCriado === true){

            return(
                <>
                    <TaskHabit>
                        <form onSubmit={nameTask}>
                            <InputHabit id="nome" type="text" placeholder="nome do hábito" value={createHabits.nome} onChange={
                                (e) => setCreateHabits({...createHabits,
                                    nome: e.target.value
                                })}
                                required
                            />
                            <ConteinerDias>
                                {checkDays.map((dias, index) => {
                                    const {id, name} = dias;
                                    const selecionado = diaSelecionado.some(dia => dia.id === id);

                                    return(
                                            <CheckBox 
                                                key={index} 
                                                selecionado={selecionado} 
                                                dia={dia} 
                                                onClick={() => {
                                                    selecionadoDia(id)
                                                    setDia(!dia)
                                                }}>{name}
                                            </CheckBox>
                                    );
                                })}
                            </ConteinerDias>
                            <Botoes >
                                <h1 onClick={() => {
                                    alert('Se deseja realmente cancelar esta rotina, clique em ok')
                                    setHabitoCriado(!habitoCriado)
                                    createHabits.nome = ''}}> Cancelar
                                </h1>
                                <Salvar type="submit" >
                                    {removeLoad === false? "Salvar" : <ThreeDots height="80" 
                                        width="80" 
                                        radius="9"
                                        color="#FFFFFF" 
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                    />}
                                    
                                </Salvar>
                            </Botoes>
                        </form>
                    </TaskHabit>
                </>
            );
        }
    }   

    return(
        <> 
            <Top/>
                <CostaTopo/>
                <Habitos load={removeLoad}>
                    <AddHabito>
                        <h1>Meus hábitos</h1>
                        <Botao onClick={()=> 
                             setHabitoCriado(!habitoCriado)
                          }>
                            +
                        </Botao>
                    </AddHabito>
                    {criarHabito()}
                    {showHabits()}
                </Habitos>
            <Menu/>
        </>
    );
}

function corDia(selecionado) {
    if (selecionado) return '#CFCFCF';
    else return '#FFFFFF';
}
function corText(selecionado) {
    if (selecionado) return '#FFFFFF';
    else return '#DBDBDB';
}

const Habitos = styled.div`
    padding: 18px;
    box-sizing: border-box;
    opacity:${(props)=> props.load === false? "1" : "0.5"};
    pointer-events: ${(props)=> props.load === false? "" : "none"};
`;
const CostaTopo = styled.div`
    height: 70px;
`;
const AddHabito = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    height: 60px;
    padding: 5px;
    box-sizing: border-box;
    h1{
        font-size:23px;
    }
`;
const Botao = styled.button`
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    font-size: 27px;
    line-height: 34px;
    text-align: center;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
`;

//======================================================================

const TaskHabit = styled.div`
    padding: 18px;
    box-sizing: border-box;
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom:10px;
`;
const InputHabit = styled.input`
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
`;
const ConteinerDias = styled.div`
    display:flex;
`;

const CheckBox =styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-top:8px;
    margin-right:4px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    cursor: pointer;
    background: ${({ selecionado }) =>
    corDia(selecionado)};
    color: ${({selecionado})=>
    corText(selecionado)};
    font-family: 'Lexend Deca';
    font-size: 20px;
    line-height: 25px;
`;
const Botoes = styled.div`
    height:40px;
    margin-top:29px;
    display:flex;
    justify-content: right;
    align-items: center;
    h1{
        cursor: pointer;
        font-family: 'Lexend Deca';
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #52B6FF;
    }
`;
const Salvar =styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 84px;
    height: 35px;
    margin-left: 23px;
    background: #52B6FF;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
`;
//================================================================

const TarefasHabitos = styled.div`
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
    margin-top: 29px;
    h1{
        font-family: 'Lexend Deca';
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;
//===================================================
const HabitosFazer = styled.div`
    width: 340px;
    height: 91px;
    border-radius: 5px;
    background: #FFFFFF;
    box-sizing: border-box;
    padding:20px;
    margin-bottom: 10px;
    h1{
        font-family: 'Lexend Deca';
        font-size: 20px;
        line-height: 25px;
        color: #666666;
    }

`;
function corDiaMarcado(selecionou){
    if(selecionou)return '#CFCFCF';
    else return '#FFFFFF';

}
function corTexto(selecionou) {
    if (selecionou) return '#FFFFFF';
    else return '#DBDBDB';
}
const CheckBoxMarcada = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-top:8px;
    margin-right:4px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    cursor: pointer;
    background: ${({ selecionado }) =>
    corDia(selecionado)};
    color: ${({selecionado})=>
    corText(selecionado)};
    font-family: 'Lexend Deca';
    font-size: 20px;
    line-height: 25px;

    `;
const Caixinhas = styled.div`
    display:flex;
`;