import express from "express"
import {loginUser, logout, registerUser} from "../controllers/user.controller.js"
import verifyJWT from "../middleware/auth.middleware.js"
const userRouter = express.Router()


userRouter.route('/auth/register').post(registerUser)
userRouter.route('/auth/login').post(loginUser)
userRouter.route('/auth/logout').post(verifyJWT,logout)
export default userRouter