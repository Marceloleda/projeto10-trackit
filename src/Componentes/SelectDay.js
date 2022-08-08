import { useState } from "react";
import styled from "styled-components";

export default function SelectDay(){
    const [dia, setDia] = useState(false);
    const [diaSelecionado, setDiaSelecionado] =useState([])
    console.log(diaSelecionado)

    const checkDays = [
        {id: 0, name: 'D'},
        {id: 1, name: 'S'},
        {id: 2, name: 'T'},
        {id: 3, name: 'Q'},
        {id: 4, name: 'Q'},
        {id: 5, name: 'S'},
        {id: 6, name: 'S'}    
    ];
        checkDays.map((dias, index) => {
        const {id, name} = dias;
        const selecionado = diaSelecionado.some(dia => dia.id === id);

        function selecionadoDia(id) {
            const jaSelecionado = diaSelecionado.some(dia => dia.id === id);
            if (!jaSelecionado) {
              setDiaSelecionado([...diaSelecionado, {id}]);
            } else {
              const novosDias = diaSelecionado.filter(dia => dia.id !== id);
              setDiaSelecionado(novosDias);
            }
        }
    

        return(
            <>
                <CheckBox 
                    key={index} 
                    selecionado={selecionado} 

                    dia={dia} 
                    
                    onClick={() => {
                        selecionadoDia(id)
                        setDia(!dia)
                        
                    }}>{name}
                </CheckBox>
            </>
        );
    })
}

function corDia(selecionado) {
    if (selecionado) return '#CFCFCF';
    else return '#FFFFFF';
}
function corText(selecionado) {
    if (selecionado) return '#FFFFFF';
    else return '#DBDBDB';
}
const CheckBox =styled.button`
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