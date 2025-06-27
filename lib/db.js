import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config({path:"../../.env"});
import logger from "../utils/logger.js";

export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        logger.info(`mongo db is connected successfully`)
    }catch(error){
        logger.error(`Error while connecting to mongodb ${error.message}`);
        process.exit(1);
    }

}