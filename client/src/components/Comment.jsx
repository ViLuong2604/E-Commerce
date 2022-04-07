import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { userRequest } from '../requestMethod'
import { useState ,useEffect} from "react";
import { AddCommentRounded } from '@material-ui/icons';
import Cmt from './Cmt';

const Wrapper = styled.div`
   border: 1px;
   display: flex;
   width: 100%;
   align-items: center;
  
`
const Image = styled.img`
   border-radius: 50%;
   width: 50px;
   height: 50px;
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
  font-weight: bold;
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
export default function Comment({user,comment,setComment}) {
  const [activeComment, setActiveComment] = useState(null);
  const[rootComments,setRootComments] = useState([])
  
   useEffect( ()=>{
    const root = comment.filter(
      (backendComment) => backendComment.parenid === null
    );
       setRootComments(root.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) )
      
   },[comment])
   
   const getReplies = (commentId) =>
    comment
      .filter((backendComment) => backendComment.parenid === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
   const  deleteComment = async(id)=>{
     if(window.confirm('xác nhận xóa bình luận !!!')){
      const res =  await userRequest.delete(`comment/${id}`)
     
      const commentDelete = comment.filter( cmt => cmt._id !== id);
        setComment(commentDelete)
     }
   
   }
  return (
    <>
     { rootComments.map( cmt=>{
       return (
         <> <Cmt cmt={cmt} comment={comment} setComment={setComment}  activeComment={activeComment}  setActiveComment={setActiveComment} children='false' user={user} deleteComment={deleteComment} />
      
         {
          getReplies(cmt._id).length > 0 && <>
               {
                 getReplies(cmt._id).map( item =>{
                    return   <Cmt children='true' activeComment={activeComment} 
                    setActiveComment={setActiveComment}  comment={comment} setComment={setComment}  cmt={item}  user={user} deleteComment={deleteComment} />
  
                 })

               }

          </>
        } 
      </> )
      
       })
     }
      
    
   
    </>
  )
}
