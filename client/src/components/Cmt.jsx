import React from 'react'
import styled from 'styled-components'
import { userRequest } from '../requestMethod'
import { useState ,useEffect} from "react";
import { AddCommentRounded } from '@material-ui/icons';
import FormComment from './FormComment';

const Wrapper = styled.div`
   border: 1px;
   display: flex;
   width: 100%;
   align-items: center;
   
   margin-left: ${(props) => props.type === 'true' && '50px'};
`
const Image = styled.img`
   border-radius: 50%;
   width: 40px;
   height: 40px;
   margin: 10px;
  
 
`
const Body = styled.div`
    
`
const NameAndDate = styled.div`
  display: flex;
    *{
        padding: 0 2px;
    }
`

const TextComment = styled.p`
 font-size: 13px;
 font-weight: 500px;
`
const Options = styled.div`
  display: flex;
  *{
    padding: 1px 2px;
  }
  *:hover{
    /* border-bottom: 1px solid black; */
    text-decoration: underline;
    cursor: alias;
  }
`
const Repply = styled.div`
  
`
const Edit = styled.div`
  
`
const Delete = styled.div`
  
`
export default function Cmt({cmt,user,deleteComment,children,setActiveComment,activeComment, comment , setComment }) {
  const isEditing =
    activeComment &&
    activeComment.id === cmt._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === cmt._id &&
    activeComment.type === "replying";
  return (
   <>
    <Wrapper type={children} key={cmt._id}>
        <Image type="edit" src='/user-icon.png'  />
        <Body>
             <NameAndDate>   
                      <p style={{color :'blue', fontWeight : '500', fontSize : '15px'}}>{cmt.username}</p>
                     <p>12/21/2022</p>
             </NameAndDate>
             {
              
              !isEditing  && <TextComment>{cmt.body}</TextComment>
             }
             {
               isEditing && (
                 <FormComment cmt={cmt} comment={comment} activeComment={activeComment}  setComment={setComment}  submitLabel='edit' setActiveComment={setActiveComment} />
               )
             }
             {
               !isEditing &&  <Options >
               {
                 user && 
                 <>
                 
                
                   <Repply  onClick={()=> setActiveComment({id:cmt._id ,type: 'replying' })}>Repply</Repply>
                
                 {
                        user._id === cmt.userid && <>
                         <Edit onClick={()=>  setActiveComment({id:cmt._id ,type: 'editing' })}>Edit</Edit>
                         <Delete onClick={()=> deleteComment(cmt._id)}>Delete</Delete>
                         </>
                 }                 
                 </>
               }
            </Options>
             }
             
        </Body>
        
      </Wrapper>
       {
         isReplying && <FormComment comment={comment} setComment={setComment}  cmt={cmt} setActiveComment={setActiveComment} submitLabel='reply' />
       }
   </>
  )
}
