import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../API/api.js'

export const add_product=createAsyncThunk(
    'product/add_product',
    async(product,{rejectWithValue,fulfillWithValue})=>{
        
        try{
            
            const {data}=await api.post('/product-add',product,{withCredentials:true});
            // console.log(data);
            return fulfillWithValue(data);
        }
        catch(error){
            return rejectWithValue(error.response.data);    
        }
    }
)



export const get_product=createAsyncThunk(
    'product/get_product',
    async({perPage,page,searchValue},{rejectWithValue,fulfillWithValue})=>{
        
        try{
            const {data}=await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,{withCredentials:true});
            // console.log(data);
            return fulfillWithValue(data);
        }
        catch(error){
            return rejectWithValue(error.response.data);    
        }
    }
)


export const productReducer=createSlice({
    name:'product',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        userInfo:'',
        products:[],
        totalProduct:0
    },
    reducers:{
        messageClear:(state,_)=>{
            state.errorMessage='';
        }
    },
    extraReducers:(builder)=>{
        builder
         .addCase(add_product.pending,(state)=>{
            state.loader=true;
         })
         .addCase(add_product.rejected,(state,{payload})=>{
            state.loader=false;
            state.errorMessage=payload.error;
         })
         .addCase(add_product.fulfilled,(state,{payload})=>{
            state.loader=false;
            state.successMessage=payload.message;
            state.products=[...state.products,payload.category]
         })

         //get_product
         .addCase(get_product.fulfilled,(state,{payload})=>{
            state.totalProduct=payload.totalProduct;
            state.products=payload.products;
            
         })

    }
});


export const {messageClear}=productReducer.actions
export default productReducer.reducer