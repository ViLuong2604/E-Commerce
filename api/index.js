const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const  dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productRouter = require('./routers/productRouter');
const authRouter = require("./routers/authRouter");
const cartRouter = require('./routers/cartRouter');
const orderRouter = require('./routers/orderRouter')
const userRouter = require('./routers/userRouter')
const commentRouter = require('./routers/commentRouter')
dotenv.config();
app.use(cors());
app.use(express.json());

// connect database

mongoose
  .connect(process.env.MONGO_URL,{ useNewUrlParser: true,
     useUnifiedTopology: true ,
     })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// router
app.use("/api/product",productRouter)
app.use("/api/auth",authRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/user",userRouter)
app.use("/api/comment", commentRouter)
app.listen(process.env.PORT || 5000 , ()=> console.log('server is running....'))