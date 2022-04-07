import axios from 'axios'

var TOKEN = null;
 try {
      TOKEN =JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken ;
 } catch (error) {
     TOKEN = "";
 }
const BASE_URL ="https://web-shop-viluong.herokuapp.com/api/"
export const publicRequest = axios.create({
    baseURL :  BASE_URL,
})

export const userRequest = axios.create({
    baseURL :  BASE_URL,
     headers : {token : `Bearer ${TOKEN}`}
})