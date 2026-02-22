import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IGrocery{
    id?:mongoose.Types.ObjectId
    quantity:number
    name:string
    image:string
    category:string
    price:string
    unit:string
    updatedAt?:Date
    createdAt?:Date
}


interface ICartSlice{
   cartData:IGrocery[]
}

const initialState:ICartSlice={
   cartData:[],
}


const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<IGrocery>)=>{
            state.cartData.push(action.payload)
        }
    }
})

export const {addToCart}=cartSlice.actions
export default cartSlice.reducer


