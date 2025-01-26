const asyncHandler = (reqHandler) =>async (req,res,next)=>{
    try{
        await reqHandler(req,res,next)
    }catch(err){
        res.status(err.statusCode || 500).json({
            message:err.message,
            success:false
    })
    }
}
export default asyncHandler