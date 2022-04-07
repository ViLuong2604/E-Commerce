import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login"
import { useState } from "react";
import { useSelector } from "react-redux";
function App() {
  // var admin = null;
  // try {
  //   admin =JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  // } catch (error) {
  //   admin = false;
  // }
  const user = useSelector((state) => state.user.currentUser);

   var admin = user ? user.other.isAdmin : false ;
  return (
    
    <Router>
      
        <Route path="/login">
        {admin ? <Redirect to="/" /> : <Login />}
           
          </Route>
    {
      user ? <> {
        admin && <>
        <Topbar />
        
        <div className="container">
       <Sidebar />
       <Switch>
         <Route exact path="/">
           <Home />
         </Route>
         <Route path="/users">
           <UserList />
         </Route>
         <Route path="/user/:userId">
           <User />
         </Route>
         <Route path="/newUser">
           <NewUser />
         </Route>
         <Route path="/products">
           <ProductList />
         </Route>
         <Route path="/product/:productId">
           <Product />
         </Route>
        
         <Route path="/newproduct">
           <NewProduct />
         </Route>
       </Switch>
     </div>
        </>
      } </>
      : <Redirect to="/login" />
     
    }
      
    </Router>
  );
}

export default App;
