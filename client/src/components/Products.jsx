import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
const Container = styled.div`
    padding: 20px;
    display: flex;
     flex-wrap: wrap; 
    justify-content: space-between;
`;

const Products = ({cat,filters,sort,page, pageSize}) => {
   
   const[products,setProducts] = useState([]);
   const[filteredProducts,setFilteredProducts] = useState([]);
   useEffect( ()=>{
       const getProduct = async ()=> {
         const product =cat ? await publicRequest.get(`/product?category=${cat}&page=${page}&pageSize=${pageSize}`) :
          await publicRequest.get(`/product`);
         setProducts(product.data)
        
        }
        getProduct();

   },[page,pageSize]);
   
   
   useEffect( ()=>{
    cat && setFilteredProducts(
      products.filter( item =>{
      return  Object.entries(filters).every( ([key,value])=>
          item[key].includes(value)
         )
      })
     )
  },[products,cat,filters])

   useEffect( ()=>{
  if(sort ==='newest'){
    setFilteredProducts( (prev)=>
        [...prev].sort( (a,b)=> a.createdAt -b.createdAt )
    )
  }else if(sort ==='asc'){
    setFilteredProducts( (prev)=>
        [...prev].sort( (a,b)=> a.price -b.price )
    )
  }else{
    setFilteredProducts( (prev)=>
        [...prev].sort( (a,b)=>  b.price - a.price )
    )
  }
  
  },[sort])
  
  return (
    <Container>
      {cat ? 
      filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )) : products.slice(0,8).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
