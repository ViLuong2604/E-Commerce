import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name : "user",
    initialState : {
       currentUser : null,
       accessToken : null,
       isFetching : false,
       error : false,

    },
    reducers : {
        loginStart :(state)=>{
             state.isFetching = true;
        },
         loginSuccess:(state,actions)=>{
            state.isFetching = false;
            state.error = false;
              state.currentUser = actions.payload.other
              state.accessToken = actions.payload.accessToken
           
       },
       loginFailure :(state)=>{
        state.isFetching = false;
        state.error = true;
       },
       logout :(state)=>{
          state.currentUser = null;
         },
         
    }
})
export const {loginStart,loginSuccess,loginFailure,logout} = userSlice.actions
export default userSlice.reducer