
import mongoose, { mongo } from "mongoose"


interface IUser{
    id?:mongoose.Types.ObjectId
    name:string
    email:string
    password?:string
    mobile:string
    role:"user" | "admin" | "deliveryboy"
    image?:string
}


const userSchema= new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:false
    },
    mobile:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:["user","admin","deliveryboy"],
        default:"user"
    },
    image:{
        type:String,
        required:false
    }

},{timestamps:true});

const User=mongoose.models.User || mongoose.model("User",userSchema)

export default User