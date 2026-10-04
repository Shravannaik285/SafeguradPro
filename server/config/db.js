import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("your mongodb has been successfully connected to backend")
    }catch(error){
        console.log("Your mongodb has failed to connect to backend",error.message);
    }
}
export default connectDB;