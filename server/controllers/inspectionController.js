import Inspection from "../models/Inspection.js";
import sendWhatsAppMessage from "../services/whatsappService.js";
const createInspection=async(req,res)=>{
    try{

         
        const inspection=await Inspection.create({
            equipmentId:req.body.equipmentId,
            location:req.body.location,
            inspectorName:req.body.inspectorName,
            inspectorPhone:req.body.inspectorPhone,
            inspectionDate:req.body.inspectionDate,
            inspectionType:req.body.inspectionType,
            notes:req.body.notes,
            userId:req.userId
        });

        console.log("Inspection saved",inspection);

        const message = `
        🔥Safeguard Pro - Inspection Request

    👨‍🔧Inspector: ${inspection.inspectorName}

    📍Location: ${inspection.location}

    📅Inspection Date: ${inspection.inspectionDate}

    🔎Inspection Type: ${inspection.inspectionType}

    📝Notes: ${inspection.notes ||"No additional notes provided."}
        
    ℹ️Project Notice:SafeguardPro is a final-year academic project developed for educational and demonstration purposes. It is not a commercial fire-safety service

    Thanks for using Safeguard Pro!`
        ;

        await sendWhatsAppMessage(message,inspection.inspectorPhone);

        return res.status(201).json(inspection);
    }catch(error){
        console.log("CREATE INSPECTION ERROR:",error);

        return res.status(500).json({
            message:"Failed to create inspection",
            error:error.message
        })
    }
};

const getInspections=async(req,res)=>{
    try{
        const inspections=await Inspection.find({
            userId:req.userId
        });

        return res.status(200).json(inspections);
    }catch(error){
        console.log("GET INSPECTIONS ERROR:",error);

        return res.status(500).json({
            message:"Failed to fetch inspection",
            error:error.message
        })
    }
}

export {createInspection,getInspections};