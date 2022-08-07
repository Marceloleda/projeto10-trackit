import styled from 'styled-components';
import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Logo from "../Assets/img/Group 8.svg"
import { ThreeDots } from 'react-loader-spinner';


export default function Login(){
    const { tasks, setTasks } = useContext(UserContext);
    const navigate = useNavigate();
    const [removeLoad, setRemoveLoad] = useState(false);
    const [login, setLogin] = useState({
        email:"",
        senha:"",
    });

    function enviar(event){
        event.preventDefault();
        setRemoveLoad(true);
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`;
        const dados ={
            email: login.email,
            password: login.senha
        }
        const promise = axios.post(URL, dados)
        promise.then((response)=>{
            console.log(response.data)
            setTasks({...tasks, 
                token: response.data.token,
                image: response.data.image
            })
            navigate('/hoje');
        })
        promise.catch((err)=>{
            alert(`Algo está errado! Verifique seus dados e tente novamente! =)`)
            setRemoveLoad(false)
        })
    }
    
    return(
        <> 
            <Conteiner load={removeLoad}>
                <Imagem src={Logo} alt='logo'/>
                <form onSubmit={enviar}>
                    <Log id="email" type="email" placeholder="email" value={login.email} onChange={(e)=>
                    setLogin({...login, email: e.target.value})
                    } required/>
                    <Log id="senha" type="password" placeholder="senha" value={login.senha} onChange={(e)=>
                    setLogin({...login, senha: e.target.value})
                    }required/>
                    <Botao type='submit' >
                        {removeLoad === false? "Entrar" : <ThreeDots height="80" 
                            width="80" 
                            radius="9"
                            color="#FFFFFF" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            />}
                    </Botao>
                </form>
                <Cadastro>
                    <Link to={`/cadastro`} style={{ textDecoration: 'none' }}>
                        <h2>Não tem uma conta? Cadastre-se!</h2>
                    </Link>
                </Cadastro>

            </Conteiner>
        </>
    );
}

const Imagem = styled.img`
    margin-top: 75px;
    margin-bottom: 35px;
  
    width: 180px;
    height: 178px;
`;
const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity:${(props)=> props.load === false? "1" : "0.5"};
    pointer-events: ${(props)=> props.load === false? "" : "none"};
`;

const Cadastro = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 25px;
    h2{
        color: #52B6FF;
    }
`;
const Log = styled.input`
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    margin-left: 36px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
`;
const Botao = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 303px;
    height: 45px;
    margin-left: 36px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border:none;
    cursor: pointer;
    font-family:     'Lexend Deca';
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    &:hover {
	    background: #0864a5;
    }
`;