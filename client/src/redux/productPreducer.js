import {createSlice} from '@reduxjs/toolkit'

const productSlice =createSlice ({
    name : 'products',
    initialState : {
        products : [{}],
        search : ''
    },
    reducers :{
        getProducts : (state,actions)=>{

        },
        setTextSearch : (state , actions)=>{
            state.search = actions.payload
        },
        clearTextSearch : (state , actions)=>{
            state.search = '';
        }

    }
})
export const {getProducts,setTextSearch,clearTextSearch} = productSlice.actions
export default productSlice.reducer