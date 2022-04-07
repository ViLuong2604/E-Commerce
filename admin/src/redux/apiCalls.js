import { publicRequest, userRequest } from "../requestMethod";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, newProductFailure, newProductStart, newProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { getUsersStart, getUsersSuccess, loginFailure, loginStart, loginSuccess, updateUsersFailure, updateUsersStart, updateUsersSuccess } from "./userReducer"

export const login = async (dispath,user)=>{
    dispath(loginStart());
   try {
    const res = await publicRequest.post("auth/login",user);
     dispath(loginSuccess(res.data))
   } catch (error) {
       dispath(loginFailure());
   }
}
export const getProducts = async(dispath)=>{
    dispath(getProductStart());
    try {
        const res = await publicRequest.get("/product") ;
        dispath(getProductSuccess(res.data));
    } catch (error) {
        dispath(getProductFailure());
    }
  }
  export const deleteProducts = async(dispath,id)=>{
    dispath(deleteProductStart());
    try {
       //  await userRequest.delete(`/products/${id}`) ;
        dispath(deleteProductSuccess(id));
    } catch (error) {
        dispath(deleteProductFailure());
    }
  }
  export const updateProducts = async(dispath,id,product)=>{
    dispath(updateProductStart());
    try {
         await userRequest.put(`/product/${id}`,product) ;
        dispath(updateProductSuccess({id,product}));
    } catch (error) {
        dispath(updateProductFailure());
    }
  }
  export const newProducts = async(dispath,product)=>{
    dispath(newProductStart());
    try {
         await userRequest.post(`/product`,product) ;
        dispath(newProductSuccess(product));
    } catch (error) {
        dispath(newProductFailure());
    }
  }
  export const getUsers = async(dispath)=>{
    dispath(getUsersStart());
    try {
       const res =  await userRequest.get(`user/`) ;
        dispath(getUsersSuccess(res.data));
    } catch (error) {
        dispath(getProductFailure());
    }
  }
  export const updateUsers = async(dispath, id,user)=>{
    dispath(updateUsersStart());
    try {
       const res =  await userRequest.put(`user/${id}`,user) ;
       console.log(res);
        // dispath(updateUsersSuccess({id,user}));
    } catch (error) {
        dispath(updateUsersFailure());
    }
  }