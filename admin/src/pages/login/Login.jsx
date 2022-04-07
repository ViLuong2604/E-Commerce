import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.p`
margin: 5px 0px;
  font-size: 13px;
 color: red;
`
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const state =useSelector(state=> state.user);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch,{username,password})
  };

  return (
   
    <Container>
    <Wrapper>
      <Title>SIGN IN</Title>
      <Form>
        <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <Input type="PASSWORD" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        {
         state.error && <Error>Sai thông tin đăng nhập Hoặc tài khoản của bạn không đủ quyền truy cập !!!</Error>
        }
        <Button onClick={handleClick}>LOGIN</Button>
       
       
      </Form>
    </Wrapper>
  </Container>
  );
};

export default Login;