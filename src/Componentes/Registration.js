import Logo from "../Assets/img/Group 8.svg"
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {ThreeDots} from 'react-loader-spinner'


export default function Registration(){
    const navigate = useNavigate();
    const [removeLoad, setRemoveLoad] = useState(false);
    const [data, setData] = useState({
        email:"",
        senha:"",
        nome:"",
        foto:""
    });

    function cadastrar(event){
        event.preventDefault();
        setRemoveLoad(true)

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`;
        const promise = axios.post(URL, {
            email: data.email,
            name: data.nome,
            image: data.foto,
            password: data.senha
        })
        promise.then((response) => {
            console.log(response)
            console.log('deu certo');
            navigate('/');
        })

        promise.catch(err => {
            setRemoveLoad(false)

            if(err.message === "Request failed with status code 409"){
                alert(`Voce ja esta cadastrado `)
            }
            if(err.message === "Request failed with status code 422"){
                alert(`Verifique se seus dados foram digitados corretamente`)
            }
           
            alert(`Tente novamente! Verifique seus dados`)
            console.log(err.message)
        })
    }
    if(data.lenght > 0){
        setRemoveLoad(true)
    }


    return(
        <>
            <Conteiner load={removeLoad}>
                <Imagem src={Logo} alt="logo"/>
                <form onSubmit={cadastrar}>
                    <CampoInfo id="email" type="email" placeholder="email" value={data.email}  onChange={
                        (e)=>setData({...data, 
                            email: e.target.value})
                    }required/>
                    <CampoInfo id="senha" type="password" placeholder="senha" value={data.senha}  onChange={
                        (e)=> setData(
                            {...data, senha: e.target.value})
                    }required/>
                    <CampoInfo id="nome" type="text" placeholder="nome" value={data.nome}  onChange={
                        (e) => setData(
                            {...data, nome: e.target.value})
                    }required/>
                    <CampoInfo id="foto" type="url" placeholder="foto" value={data.foto} onChange={
                        (e) => setData(
                            {...data, foto: e.target.value})
                    }required/>
                    <Botao type='submit' >
                        {removeLoad === false? "Cadastrar" : <ThreeDots height="80" 
                            width="80" 
                            radius="9"
                            color="#4fa94d" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            />}
                    </Botao>
                </form>
                <Cadastro>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                        <h2>Já tem uma conta? Faça login!</h2>
                    </Link>
                </Cadastro>
            </Conteiner>  

        </>
    );
}
<ThreeDots 

 />

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

const CampoInfo = styled.input`
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
    font-family: 'Lexend Deca';
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    &:hover {
	    background: #0864a5;
    }
`;

const Cadastro = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 25px;
    h2{
        color: #52B6FF;
    }
`;