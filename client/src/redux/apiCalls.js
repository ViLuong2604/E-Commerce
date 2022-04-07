import {loginStart,loginFailure,loginSuccess} from './userReducer'


import { publicRequest } from '../requestMethod';

export const login = async (dispath,user)=>{
    dispath(loginStart());
   try {
    const res = await publicRequest.post("auth/login",user);
     dispath(loginSuccess(res.data))
   } catch (error) {
       dispath(loginFailure());
   }
}
