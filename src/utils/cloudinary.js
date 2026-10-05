import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// fs means file system of node
//helps in read, write, removing file tec other operations like getting path, changing permission etc

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


    const uploadOnCloudinary = async (localFilePath)=>{
        try{
            if(!localFilePath) return null;
            //upload the file on cloudinary
            const reponse= await cloudinary.uploader.upload(localFilePath,{
                recource_type:"auto"
            })
            //file has been uploaded successfully
            console.log("File has been Successfully uploaded on Cloudinary", response.url);
            return response;
        }
        catch(error){
             fs.unlinkSync(localFilePath); //delete the file from local storage if error occurs
              return null;
        }
    }
  export default uploadOnCloudinary;
    