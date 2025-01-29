import express from "express"
import {loginUser, logout, registerUser} from "../controllers/user.controller.js"
import verifyJWT from "../middleware/auth.middleware.js"
import { addCommand,getAllCommands } from "../controllers/command.controller.js"
const userRouter = express.Router()


userRouter.route('/auth/register').post(registerUser)
userRouter.route('/auth/login').post(loginUser)
userRouter.route('/auth/logout').post(verifyJWT,logout)
userRouter.route('/addCommand').post(addCommand)
userRouter.route('/getCommands').get(verifyJWT,getAllCommands)
export default userRouter