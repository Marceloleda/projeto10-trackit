import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function Menu(){
    const value = 0.2;
    return(
        <>

            <Footer >
                <Porcentagem >
                    <Link to={'/hoje'} style={{ textDecoration: 'none' }}>
                        <CircularProgressbar 
                        value={value} 
                        maxValue={1} 
                        text={`Hoje`} 
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            pathColor: "#FFFFFF",
                            trailColor: "none",
                            textColor: "#FFFFFF",

                        })}
                        />
                    </Link>
                </Porcentagem>
                <Link to={'/habitos'} style={{ textDecoration: 'none' }}><h1>Hábitos</h1></Link>


                <Link to={'/historico'} style={{ textDecoration: 'none' }}><h1>Hitórico</h1></Link>
            </Footer>
        </>
    );
}
const Footer = styled.div`
    position:fixed;
    display:flex;
    justify-content: center;
    justify-content: space-between;
    align-items:center;
    padding: 35px;
    box-sizing: border-box;
    height: 70px;
    width: 375px;
    bottom: 0px;
    color: #FFFFFF;
    background: #FFFFFF;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        }
`;
const Porcentagem = styled.div`
    position:fixed;
    display: flex;
    justify-content: center;
    margin-top: 0px;
    margin-bottom:50px;
    margin-left: 100px;
    width: 100px; 
    height: 100px;
`;