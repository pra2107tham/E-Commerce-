import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/Ecommerce")
        if(connect){
            console.log("Database connected successfully");
        }else{
            console.log("Database connection failed");
        }
    } catch (error) {
        console.log("Error while connecting to database", error);
        
    }
}

export default connectDB;