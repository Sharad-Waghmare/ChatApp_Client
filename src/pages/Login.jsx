import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo1.svg";


function Login() {
  const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
        
      });

      const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      useEffect(() =>{
        if(localStorage.getItem('chat-app-user')){
          navigate('/')
        }
      },[])


    const handleValidation = () => {
      const { password,  username } = values;
      if (password === "" ) {
        toast.error(
          "Password is required.",
          toastOptions
        );
        return false;
      } else if (username.length === "") {
        toast.error(
          "Email and Password is required.",
          toastOptions
        );
        return false;
      } 
  
      return true;
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if(handleValidation()){
        const { password, username} = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password
        });

        if (data.status === false){
          toast.error(data.message, toastOptions);
        }

        if(data.status === true){
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
          navigate('/')
        }
      }
  }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };

    return (
        <>
        <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
          <img src={Logo} alt="logo" />
            <h1>WhatsApp</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
         
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
         
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
       <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    weight: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;
    .brand{
        display: flex;
        justify-content: center;
        align-items: center;
        

        img {
          height: 5rem;
          width: 5rem;
        }

        h1{
            color: white;
            margin-right: 2.5rem;
          
        }
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;

            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
              }
        }

        button {
            background-color: #4e0eff;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 1s ease-in-out;
            &:hover {
              background-color: #4e0eff;
            }
    }
    span {
        color: white;
        text-transform: uppercase;
        a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold;
        }
      }
`;
export default Login;