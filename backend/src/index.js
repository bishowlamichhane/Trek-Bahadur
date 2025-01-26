
import app from "./app.js"
import dotenv from 'dotenv'
import connectDB from "./db/index.js"



const port = process.env.PORT || 8000
dotenv.config({
    path:"./.env"
})
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`App listening at port ${port}`)
    })
})
.catch((err=>{
    console.log("MongoDB connection Failed!! ",err)
}))

