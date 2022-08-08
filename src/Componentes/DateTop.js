import styled from "styled-components";
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br';


export default function DateTop(){
    const today = dayjs().day();
    const date = dayjs().date();
    const month = dayjs().month()+1;
    const weekDay = dayjs().day(today);
    const day = dayjs(weekDay).locale(ptBr).format('dddd');
    const dayName = day.charAt(0).toLocaleUpperCase() + day.slice(1);

    return(
        <>
            <Dia>
                <h1>{dayName}, {date < 10? "0" : ""}{date}/{month < 10? "0" : ""}{month}</h1>
            </Dia>
        </>
    );
}
const Dia = styled.div`
    margin-bottom:20px;
    height: 40px;
    h1{
        font-family: 'Lexend Deca';
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
`;