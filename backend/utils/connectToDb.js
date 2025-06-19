import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName : "blog"})
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log("Error in mongodb connection")
    }
}