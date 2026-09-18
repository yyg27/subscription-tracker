import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

//Check DB_URI
if(!DB_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env<development/production>.local");
}

//Function to connect mongoose to the database
const connectToDatabase = async() =>{ 
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode.`);
    }catch(error){
        console.log("Error! Connecting to database: ", error)
        process.exit(1);
    }    
}

export default connectToDatabase;