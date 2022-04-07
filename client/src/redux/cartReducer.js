import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        products : [],
        quantity : 0,
        total : 0
    },
    reducers : {
        addProduct : (state , actions) =>{
            state.products.push(actions.payload)
            state.quantity += 1;
            state.total += actions.payload.price *actions.payload.quantity
            // var check = false;
            // var index ;
            // if(state.products.length >=1){
            //     for(let i  =0; i<state.products.length ; i++){
            //          if(actions.payload._id === state.products[i]._id) {
            //              check = true;
            //              index =i;
            //              break;
            //          }
            //     }
            // }
            // if(check){
            //     state.products[index].quantity = state.products[index].quantity + actions.payload.quantity;               
            //   }else{
            //     state.products.push(actions.payload)
            //    state.quantity += 1;
            //    state.total += actions.payload.price *actions.payload.quantity
            //   }
        },
        deleteProducts : (state , actions)=>{
            state.products =[];
            state.quantity = 0;
            state.total =0;
        },
        deleteOneProducts : (state , actions)=>{
           
        var p ;
            for (let i = 0; i < state.products.length; i++) {
               if(state.products[i].idRd === actions.payload){
                   p = state.products[i];
               }
                
            }
            
             state.quantity = state.quantity - 1;
             
             state.total -= p.price * p.quantity;
             state.products = state.products.filter(item => item.idRd !== actions.payload)
            
            
        }
    }
})
export const {addProduct,deleteProducts,deleteOneProducts} = cartSlice.actions
export default cartSlice.reducer