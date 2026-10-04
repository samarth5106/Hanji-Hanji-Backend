import mongoose from "mongoose";
 import jwt from "jsonwebtoken";
 import bcrypt from "bcrypt";
//jwt is  a bearer token
//we cant directly encrypt so we use mongoose hooks-prehook middleware

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim :true,
        index:true// to make it searchable
    },
    email:{
         type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim :true
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim :true,
        index:true
    },
    avatar:{
        type:String, //ye string means url from cloudnary
        required:true
    },
    coverimage:{
        type:String, //ye string means url from cloudnary
    },
    
    watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    
    password:{
        required:[true, "Password is required"],
        unique:true,
        trim:true,
        type:String
    },
    refreshToken:{
        type:String
    }
 },{timestamps:true}
)               

 const User=mongoose.model("User",UserSchema);

    UserSchema.pre("save",async function(next){
        if(!this.isModified("password")) return next();

        this.password=bcrypt.hash(this.password, 10);
        next();
    })
 
UserSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password);
}


UserSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        fullname:this.fullname,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

UserSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)}

 export default User;