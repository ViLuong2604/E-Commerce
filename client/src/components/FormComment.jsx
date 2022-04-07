import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { publicRequest, userRequest } from '../requestMethod';
const Input = styled.input`
 overflow-y: scroll;
 margin: auto;
 width: 99%;
 height: ${ props =>  props.type === 'edit' ? '50px' : '60px'} ;
border: none;
border-bottom: 0.2px solid gray;
  margin-left: ${(props) => props.type && props.type !== 'edit'? '50px' : '0px' };
 :focus {
  outline: none;
 }
 
` 
const Button = styled.button`
    /* height: 25px;
    margin: 10px;
    border-radius: 3px ;
    background-color: green; */
    margin: 5px;
    padding: 5px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  } 
    margin-left: ${(props) => props.type && props.type !== 'edit' ? '50px' : '0px' };
`

export default function FormComment({ cmt,comment,setComment,submitLabel,setActiveComment,activeComment}) {
  
    const[body ,setBody] = useState('');
    useEffect( ()=> {
        submitLabel === 'edit' && setBody(cmt.body)
    },[cmt])
    const id = cmt ?  (cmt.parenid ? cmt.parenid : cmt._id ): null ;
    const productid=  useLocation().pathname.split("/")[2];
     const user = useSelector((state) => state.user.currentUser);
       const commentNew =({
            body,
            username : user ?  user.username : null,
            userid :  user ? user._id : null ,
            parenid : id,
            productid :  productid 
        })
    const createcomment = async ()=>{
      const res = await userRequest.post('comment',commentNew);
    
       setComment([...comment ,res.data]);
      setActiveComment &&    setActiveComment(null)
      setBody("")
    }    
    const editcomment = async ()=>{
      const res = await userRequest.put(`comment/${cmt._id}`,{body : body});
       
      
       const data = comment.filter( item => item._id !== cmt._id);
       data.push(res.data)
       setActiveComment(null)
       setComment(data);
          
      setBody("")
    }    
  return (
    <>
    {
      
      submitLabel === 'edit' ? <Input type={submitLabel}      value={body} onChange={ e => setBody(e.target.value)} /> :
      <Input type={submitLabel} disabled={user?  false : true}  placeholder={user ? 'comment san pham' : 'đăng nhập để bình luận'} value={body} onChange={ e => setBody(e.target.value)} />
    }
      <Button type={submitLabel}  onClick={ ()=> {

activeComment ? 
        activeComment.type ==='editing' ? editcomment() : createcomment() : createcomment();
       
      }
      
      } disabled={body.length ===0 }  >  {submitLabel ? submitLabel : 'comment'}   </Button>
       {
         submitLabel && <Button type={submitLabel}  
          onClick={()=> {
            setActiveComment(null) ;
            } }  > Cancel </Button>
       }
     
    </>
  )
}

