import mongoose from 'mongoose'

const commandSchema = new mongoose.Schema({
    input:{
        type:String,
        required:true,
        trim:true
    },
    result:{
        type:String,
        required:true,
        trim:true
    }


},{timestamps:true})

export const Command = mongoose.model("Command",commandSchema)