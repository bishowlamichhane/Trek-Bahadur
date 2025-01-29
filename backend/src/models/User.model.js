import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true  
    },

    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true

    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    userCommands:[
        {
        type:Schema.Types.ObjectId,
        ref:"Command"
        }
    ],
    refreshToken:{
        type:String
    }
},{timestamps:true})


userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        next()
    }
    else{
        return next()
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})
}

export const User = mongoose.model("User",userSchema)