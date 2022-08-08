import styled from "styled-components";
import Top from "./Top";
import Menu from "./Menu";

export default function Historic () {
    return (

        <>
            <Top/>
            <Body>
                <CostaTopo/>
                <HistoryTitle>Histórico</HistoryTitle>
                <FutureHistory>Em breve, você poderá ver o histórico dos seus hábitos, aqui!</FutureHistory>
            </Body>
            <Menu/>
        </>

    );
}
const Body =styled.div`
    padding: 18px;
    box-sizing: border-box;
`;
const HistoryTitle = styled.div`
    margin-top: 20px;
    height: 29px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 23px;

    color: #126BA5;
`;

const FutureHistory = styled.div`

    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 235px;
    height: 74px;

    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;

    color: #666666;

`;
const CostaTopo = styled.div`
    height: 70px;
`;