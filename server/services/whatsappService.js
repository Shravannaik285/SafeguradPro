import axios from 'axios';

const sendWhatsAppMessage=async(message,recipientPhone)=>{
    try{
        const url=`https://graph.facebook.com/v25.0/1354810344376971/messages`
        //console.log("WhatsApp recipient:", recipientPhone);
        //console.log("WhatsApp message:", message);
        
        const response=await axios.post(
            url,{
                messaging_product:"whatsapp",
                to:recipientPhone,
                type:"image",
                image:{
                   link:"https://res.cloudinary.com/qpfzlzka/image/upload/f_auto/q_auto/safeguardpro.png",
                   caption:message
                }
            },
            {
                headers:{
                    Authorization:`Bearer ${process.env.WHATSAPP_TOKEN}`,
                    "Content-Type":"application/json"
                }
            }
        );
        console.log("WhatsApp message sent: ",response.data);

        return response.data;
    }catch(error){
        console.error("WhatsApp API Error:",error.response?.data||error.message);
        throw error;
    }
}
export default sendWhatsAppMessage;