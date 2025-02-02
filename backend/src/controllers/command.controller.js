import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import { Command } from "../models/Command.model.js"
import { User } from "../models/User.model.js"
import mongoose, { Schema } from "mongoose"
const addCommand = asyncHandler (async (req,res)=>{


    const {input,result} = req.body
    if(!input)
        throw new ApiError(400,"Input not received")
    
    const newCommand = await Command.create({
        input,result
    })
    await newCommand.save();

    return res.status(201).json(new ApiResponse(201,newCommand,"Command saved"))


})

const getAllCommands = asyncHandler(async(req,res)=>{

    const userId = req.user._id

    const commands = await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(userId)
            }

        },
        {
            $lookup:{
                from:"commands",
                localField:"userCommands",
                foreignField:"_id",
                as:"userCommands"
            }
        },
       
    ])


    return res.status(200).json(new ApiResponse(200,commands,"All user commands retrieved successfully"))

})
export {addCommand,getAllCommands}