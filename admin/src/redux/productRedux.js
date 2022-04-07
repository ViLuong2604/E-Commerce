import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice ({
    name : 'product',
    initialState :{
        products : [],
        isFetching : false,
        error : false,
        success : false
    },
    reducers : ({
       // GET ALL
       getProductStart : (state)=>{
           state.error = false;
         state.isFetching = true;
       },
       getProductSuccess: (state,actions)=>{
        state.isFetching = false;
        state.error = false;
        state.products = actions.payload
      },
      getProductFailure : (state)=>{
        state.isFetching = false;
        state.error = true;
      },
       // Delete
       deleteProductStart : (state)=>{
        state.error = false;
      state.isFetching = true;
    },
    deleteProductSuccess: (state,actions)=>{
     state.isFetching = false;
   state.products.splice( state.products.findIndex(item =>item._id ===actions.payload),1)
     
   },
   deleteProductFailure : (state)=>{
     state.isFetching = false;
     state.error = true;
   },
    // Update
    updateProductStart : (state)=>{
      state.success = false ;
      state.error = false;
    state.isFetching = true;
  },
  updateProductSuccess: (state,actions)=>{
   state.isFetching = false;
   
 state.products[state.products.findIndex(item =>item._id ===actions.payload.id)] =actions.payload.product;
    state.success = true;
 },
 updateProductFailure : (state)=>{
  state.success = false ;
   state.isFetching = false;
   state.error = true;
 },
 // new
    newProductStart : (state)=>{
      state.error = false;
    state.isFetching = true;
    },
    newProductSuccess: (state,actions)=>{
    state.isFetching = false;
    state.products.push(actions.payload)

    },
    newProductFailure : (state)=>{
    state.isFetching = false;
    state.error = true;
},
    })
})
export const {getProductStart,getProductSuccess,getProductFailure
  ,deleteProductFailure,deleteProductStart
,deleteProductSuccess,updateProductFailure,updateProductSuccess,updateProductStart,
newProductFailure,newProductSuccess,newProductStart} =productSlice.actions
export default productSlice.reducer