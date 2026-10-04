import "dotenv/config";
import sendWhatsAppMessage from "./services/whatsappService.js";

const test=async(message)=>{
    try{
        await sendWhatsAppMessage(
            "Safeguard Pro Whatsapp API test successful"
        );

        console.log("Test completed");
    }catch(error){
        console.log("Test failed");
    }
}

test();