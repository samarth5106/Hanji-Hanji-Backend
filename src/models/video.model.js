import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number, // video file se information milegi abt the duraition of video,
        required:true
    },
    views:{
        type:Number,
        defaut:0
    },
    ispublished:{
        type:Boolean,
        default:true
    },
    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

},{timestamps:true}
)

videoSchema.plugin(mongooseAggregatePaginate);

const Video=mongoose.model("Video",videoSchema);

export default Video;
