import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0px;
  color: red;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 5px;
  :disabled{
  
    background-color: gray;
  }
`;

const Register = () => {
  const[username,setUsername] =useState('');
  const[email,setEmail] =useState('');
  const[password,setPassword] =useState('');
  
  const[redirect,setRedirect] =useState(false);
  const[confirmpassword,setConfirmpassword] = useState('');
 
  
    const disable = (username.length < 1 || password.length <1 || email.length <1 || confirmpassword.length< 1) 
    ? true : false;
    const checkpass = password !== confirmpassword && confirmpassword.length>0 ? true : false ;
    
    const register = (e)=>{
      e.preventDefault();
         publicRequest.post("auth/register",{
         username,password,email
       }).then( res => {
        window.confirm('đăng ký thành công! bạn có muốn đăng nhập') && setRedirect(true)
        
       }  )
       .catch( err => window.confirm('Tên đăng nhập hoặc địa chỉ email đã tồn tại'))
      
     
    }
   
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {/* <Input placeholder="name" />
          <Input placeholder="last name" /> */}
          <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
          <Input placeholder="confirm password" type="password" onChange={e => setConfirmpassword(e.target.value)} />
          {
            checkpass && (
              <Agreement>
              Mật khẩu không trùng khớp, vui lòng nhập lại đúng mật khẩu
            </Agreement>
            ) 
             
          }
          {
            disable && (
              <Agreement  >
              Để đăng ký, Xin quý khách vui lòng điền đầy đủ thông tin 
            </Agreement>
            )
          }
          {
            redirect && <Redirect to="/login" />
          }
         
          <Button onClick={register} disabled={disable && !checkpass ? true : false} >CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
