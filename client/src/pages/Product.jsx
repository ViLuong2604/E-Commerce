import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import FormComment from "../components/FormComment";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { getCommemt } from "../redux/apiCalls";
import { addProduct } from "../redux/cartReducer";
import { publicRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
 /* width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px; */
   padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  } 
`;
const CommentContainer = styled.div`
overflow-x: hidden;
   border: 0.2px solid green;
   border-radius: 5px;
   width: 100%;
   height: 500px;
   margin-top: 50px;
   overflow-y: scroll;  
       
`

const Product = () => {
  const user = useSelector(state => state.user.currentUser) 
  const id=  useLocation().pathname.split("/")[2];
  const[product,setProduct]=useState({});
  const[quantity,setQuantity ] =useState(1);
  const[color,setColor] = useState('');
  const[size,setSize] = useState('');
  const[comment,setComment] = useState([]);
  const dispath = useDispatch();

  
  
  useEffect(()=>{
     const getProduct = async ()=>{
       const res = await publicRequest.get(`product/${id}`);
     
       setProduct(res.data)
   } 
   
   getProduct();
  },[id])

   useEffect(()=>{
        const comment = async ()=>{
          const res =await  publicRequest(`comment/${id}`);
          setComment(res.data);
        } 
        comment();

   },[id])
   
  const handleQuantity =(x)=>{
    if(x==='add'){
      setQuantity(quantity+1);
    }else{
      quantity <=1 ? setQuantity(1) : setQuantity(quantity-1);
    }
  }
  const addToCart =()=>{
    const rd = Math.random();
    color.length<=0 &&  product.color.length > 0 && setColor(product.color[0])
    size.length <=0 ?  window.confirm('vui lòng chọn size  !!!') : 
    dispath(addProduct({...product,quantity,color,size,idRd : rd}));
    
  }
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
           {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle disabled selected  >Color</FilterTitle>
             {
                product.color?.map( c => <FilterColor onClick={() => setColor(c)} value={c} color={c} />)
              } 
              
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={ e => setSize(e.target.value)}>
              <FilterSizeOption  selected disabled={true}>size</FilterSizeOption>
              {
                product.size?.map( s => <FilterSizeOption value={s}>{s}</FilterSizeOption>)
              }

              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleQuantity('remove')} />
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity('add')} />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
          <CommentContainer>
                <FormComment comment={comment}  setComment={setComment} />
                 <Comment user={user} comment={comment}  setComment={setComment} />
          </CommentContainer>
        </InfoContainer>
        
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
