import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";

import {Add, ArrowLeftOutlined, ArrowLeftRounded, KeyboardArrowLeftOutlined, KeyboardArrowLeftRounded, KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from "@material-ui/icons";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Pagination = styled.div`
  height: 30px; 
  width:100% ;
  display: flex;
  align-items:center ;
  margin-bottom:15px ;
  justify-content:center ;
  *{
    margin:0 24px ;
   
  }
  *:hover{
     background-color:gray ;
     color:white ;
  }
   
`
const Page = styled.label`
   font-size: 30px ;
`
const Option = styled.option``;

const ProductList = () => {
  const cat=  useLocation().pathname.split("/")[2];
   const[filters,setFilter] = useState({});
   // phan phan trang
   const[page,setPage] = useState(1);
   const[maxPage,setMaxpage] = useState(1);
   const[totalProduct,setTotalProduct] =useState(0);

    const PAGE_SIZE =4 ;
   const[sort,setSort] = useState("");
   useEffect(()=>{
      const countPage = async ()=>{
        const res = await publicRequest.get(`product/count?category=${cat}`);
         setTotalProduct(res.data)
      }
      countPage();
   },[cat])
   useEffect(()=>{
    setMaxpage(totalProduct%PAGE_SIZE ===0 ? totalProduct/PAGE_SIZE : Math.floor(totalProduct/PAGE_SIZE)+1);
    },[totalProduct])
    

   const filterHandle =(e)=>{
     setFilter({...filters, [e.target.name] : e.target.value})
   }
   const sortHandle =(e)=>{
      setSort(e.target.value)
   }
   const pageClick =(x)=>{
     if(x ==='left'){
       page <=1 ? setPage(1) : setPage(page -1);
     }else{
         page >= maxPage ? setPage(maxPage): setPage(page +1);
     }
   }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={filterHandle}>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={ filterHandle}>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={sortHandle}>
            <Option selected value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products filters={filters} sort={sort} page={page} pageSize={PAGE_SIZE} cat={cat} />
       <Pagination>
           <KeyboardArrowLeftTwoTone onClick={()=>pageClick('left')} style={{fontSize : '35px'}} />
           <Page>{page}</Page>
           <KeyboardArrowRightTwoTone onClick={()=>pageClick('right')} style={{fontSize : '35px'}} />
       </Pagination>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
