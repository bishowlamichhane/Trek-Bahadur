import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateTokens = async (userId)=>{
    try{

        //find user by Id
        const user = await User.findById(userId)
        if (!user) throw new ApiError(404, "User not found");

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})


        return {accessToken,refreshToken}

    }catch(err){
        throw new ApiError(500, "Error generating Refresh and Access token")

    }
}


const registerUser = asyncHandler(async (req,res)=>{

    const {fullName,username,email,password} = req.body

    //check if all fields are filled 
    //check if user exists
    //hash password
    //register user


    if(!fullName && !username && !email && !password)
        throw new ApiError(400,"All fields are required")

    const existingUser = await User.findOne(
        {
            $or:[{username,email}]
        }
    )
    if(existingUser)
        throw new ApiError(400,"User Already Exists. Login")

  


    const newUser = await User.create({
        fullName,
        username:username.toLowerCase(),
        email,
        password
    
    })

    

   
    const userCreated = await User.findById(newUser._id).select("-password -refreshToken")
    if(!userCreated)
        throw new ApiError(500,"Something went wrong while registering a user")


   

    return res
    .status(201)
    .json(
        new ApiResponse(201,userCreated,"User created and Logged In Successfully")
    )

   

})

const loginUser = asyncHandler(async (req,res)=>{

    const {username,password} = req.body

    if(!username && !password)
        throw new ApiError(400,"All fields are required")

    const existingUser= await User.findOne({
        $or:[{username}]
    })

    if(!existingUser)
        throw new ApiError(404,"User not found, please register user")

    const passwordMatch = await existingUser.isPasswordCorrect(password)

    if(!passwordMatch)
        throw new ApiError(400,"Incorrect Password")

    const {accessToken,refreshToken} = await generateTokens(existingUser._id)

    const options = {
        httpOnly:true,
        secure:true
    }
    const loggedUser = await User.findById(existingUser._id).select("-password -refreshToken ") 

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{user:loggedUser,accessToken,refreshToken},"User Logged in Successfully")
    )




})


const logout = asyncHandler(async(req,res)=>{
    const userId = req.user._id
    const user = await User.findByIdAndUpdate(userId,{
        $unset:{
            refreshToken:1
        }
    },{
        new:true
    })

    const options={

        httpOnly:true,
        secure:true
    }
  
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200,{},"User logged out successfully"))
})

export {registerUser,loginUser,logout}