const Product = require('../models/Product')
 const productControllers = ({
  createProduct : (req,res)=>{
     
      try {
        const newproduct = new Product(req.body);
          newproduct.save()
          .then( product =>   res.status(200).json(product))
          .catch(err => res.status(200).json({err}));
      } catch (error) {
        res.status(500).json({error})
      }
      
  },
  getProducts :async (req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const pageSize = req.query.pageSize;
    const page = req.query.page;
    var skip = (page-1) *pageSize;
   
   
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      }
       else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        }).skip(skip).limit(pageSize);
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
   },
   countProducts :async (req,res)=>{
     const category = req.query.category;
     if(category){
      const pageNumber = await  Product.count({categories:{$in : category}});
      res.status(200).json(pageNumber)
     }else{
      const pageNumber = await  Product.count();
      res.status(200).json(pageNumber)
     }
    
    
   },
   updateProducts :async (req,res)=>{
    try {
      
      const updateProduct =  await Product.findByIdAndUpdate(req.params.id ,
        {
          $set : req.body
        }
        ,{new : true});
      res.status(200).json(updateProduct)
    } catch (error) {
      res.status(500).json({error})
    }   
  },
  deleteProducts :async (req,res)=>{
    try {
      
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("delete success....")
    } catch (error) {
      res.status(500).json({error})
    }   
  },
  getOneProduct :async (req,res)=>{
    try {
      const product = await Product.findById(req.params.id);

       res.status(200).json(product)
    } catch (error) {
      res.status(500).json({error})
    }
    
  },findProducts :async (req,res)=>{
    
    try {
      
      const findProducts =  await Product.find({
        title : {$regex : new RegExp(req.params.find)}
      }
      
        );
      res.status(200).json(findProducts)
    } catch (error) {
      res.status(500).json({error})
    }   
  },
})
module.exports = productControllers;