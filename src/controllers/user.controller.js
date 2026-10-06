import {asyncHandler} from "../utils/asyncHandler.js";

// to register the user
const registerUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
        //hamne json response send kia 
    })
})
//method run tb hoga jb url hit hoga
//here comes routes

export {registerUser};