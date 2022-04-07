import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : "user",
    initialState : {
       currentUser : null,
       isFetching : false,
       error : false,
       users : []
    },
    reducers : {
        loginStart :(state)=>{
             state.isFetching = true;
        },
         loginSuccess:(state,actions)=>{
            state.isFetching = false;
            state.error = false;
              state.currentUser = actions.payload
           
       },
       loginFailure :(state)=>{
        state.isFetching = false;
        state.error = true;
       },
       logout :(state)=>{
          state.currentUser = null;
         },
         getUsersStart :(state)=>{
            state.isFetching = true;
       },
        getUsersSuccess:(state,actions)=>{
           state.isFetching = false;
           state.error = false;
             state.users = actions.payload
          
      },
      getUsersFailure :(state)=>{
       state.isFetching = false;
       state.error = true;
      },
      updateUsersStart :(state)=>{
         state.isFetching = true;
    },
     updateUsersSuccess:(state,actions)=>{
        state.isFetching = false;
        
          state.users[state.users.findIndex(item =>item._id ===actions.payload.id)] =actions.payload.user;
   },
   updateUsersFailure :(state)=>{
    state.isFetching = false;
    state.error = true;
   },
   deleteUser :(state,actions)=>{
      
       state.users  = state.users.filter( u => u._id !== actions.payload)
      
     },
    }
})
export const {loginStart,loginSuccess,loginFailure,logout,getUsersFailure,getUsersStart,
   updateUsersFailure,updateUsersStart,updateUsersSuccess,getUsersSuccess,deleteUser} = userSlice.actions
export default userSlice.reducer