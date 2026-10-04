import mongoose from "mongoose";

const inpsectionSchema=new mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    inspectorName:{
        type:String,
        required:true
    },
    inspectorPhone:{
        type:String,
        required:true
    },
    inspectionDate:{
        type:String,
        required:true
    },
    inspectionType:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        default:"Requested"
    },
    userId:{
        type:String,
        required:true
    }
    },{
    timestamps:true
});

const Inspection=mongoose.model("Inspection",inpsectionSchema);
export default Inspection;