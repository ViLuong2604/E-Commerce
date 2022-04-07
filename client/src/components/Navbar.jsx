import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setTextSearch } from "../redux/productPreducer";
import { logout } from "../redux/userReducer";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  *{
    text-decoration:none ;
  }
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
   :focus{
     outline: none;
   }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color:black ;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [quantity,setQuantity] = useState(0);
  const [search,setSearch] = useState('');
  const dispath = useDispatch();
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user.currentUser)
  const searchHandle = (e)=>{
    dispath(setTextSearch(search))
    
  }
   useEffect(()=>{
     setQuantity(cart.quantity)
   },[cart])
   const logoutHandle =()=>{
       dispath(logout());
   }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" onChange={e => setSearch(e.target.value)} />
            <Search onClick={searchHandle} style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
          <Logo>VILUONG.</Logo>
          </Link>
        </Center>
        <Right>
           {
              !user && (
                <Link style={{color : "black"}} to="/register" >
            
                <MenuItem>REGISTER</MenuItem>
                </Link>
              )
            }
          

          {
            user ? 
            
            <MenuItem onClick={logoutHandle} >LOGOUT</MenuItem>
           :
             <Link style={{color : "black"}} to="/login">
            <MenuItem>SIGN IN</MenuItem>
            </Link>
          }
         

          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <Link to="/cart">
              <ShoppingCartOutlined />
              </Link>
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
