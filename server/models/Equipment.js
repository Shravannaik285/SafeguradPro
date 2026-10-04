import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    equipmentType: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    inspection: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    icon:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true
    }
});

const Equipment = mongoose.model("Equipment", equipmentSchema);
export default Equipment;