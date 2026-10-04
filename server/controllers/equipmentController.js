import Equipment from '../models/Equipment.js';

const getEquipments=async(req,res)=>{
    try{
        const equipments=await Equipment.find({
            userId:req.userId
        });
        res.status(200).json(equipments);
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch equipment",
            error:error.message
        })
    }
};

const addEquipment=async(req,res)=>{
   try{
    const equipment=await Equipment.create({
        ...req.body,
        icon:req.body.equipmentType,
        userId:req.userId
    })
    return res.status(200).json(equipment);
   }catch(error){
    console.error("ADD EQUIPMENT ERROR: ",error);
    res.status(500).json({
        message:"Failed to add equipment",
        error:error.message
    })
   }
}

const updateEquipment=async(req,res)=>{
    try{
        const equipment=await Equipment.findOneAndUpdate(
            {
                _id:req.params.id,
                userId:req.userId
            },
            {
                status:req.body.status
            },
            {
                returnDocument:"after"
            }
        );
        if(!equipment){
            return res.status(404).json({
                message:"Equipment not found"
            })
        }
        return res.status(200).json(equipment);
    }catch(error){
        console.log("UPDATE STATUS ERROR: ",error);

        return res.status(500).json({
            message:"Failed to update equipment status",
            error:error.message
        });
    }
}

export {getEquipments,addEquipment,updateEquipment};