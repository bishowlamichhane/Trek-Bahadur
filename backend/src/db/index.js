import mongoose from "mongoose"
import { dbName } from "../constants.js"
const connectDB= async ()=>{

    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${dbName}`)
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)

        return connectionInstance.connection.host

    }catch(err){
        console.log("MongoDB connection error ",err)
        process.exit(1)
    }
    


    
}

export default connectDB