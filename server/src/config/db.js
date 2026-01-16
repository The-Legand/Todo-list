import mongoose from 'mongoose';
import "dotenv/config";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to db sucessfully")
    }
    catch(e){
        console.log(e)
    }
}

export default connectDB;
