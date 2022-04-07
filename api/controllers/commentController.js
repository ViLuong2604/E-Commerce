const Comments = require('../models/Comments')

const commentController =({
   createComment :async (req,res)=>{
    const comment = new Comments({
      body : req.body.body,
      username : req.body.username,
      userid : req.body.userid,
      parenid : req.body.parenid,
      productid : req.body.productid
    })
     comment.save()
    
     .then( newcomment => res.status(200).json(newcomment) )
    .catch(err => res.status(500).json(err));
  
      
   },
   getComment :async (req,res)=>{
     try {
        const comments  =await Comments.find({productid :  req.params.id})
            
            res.status(200).json(comments)
            } catch (error) {
            res.status(500).json(error)
            }     
    },
    deleteComment :async (req,res)=>{
      try {
         await  Comments.findByIdAndDelete({_id : req.params.id})
             
             res.status(200).json('delete successfully ...')
             } catch (error) {
             res.status(500).json(error)
             }     
     },
     editComment :async (req,res)=>{
      try {
          const newComment = await Comments.findByIdAndUpdate(req.params.id, 
            {
              body : req.body.body
            },{new : true})
             
             res.status(200).json(newComment)
             } catch (error) {
             res.status(500).json(error)
             }     
     },
 })

module.exports = commentController
