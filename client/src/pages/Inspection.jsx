import React,{useState,useEffect} from 'react';
import { auth } from '../firebase.js';
import Navbar from '../components/Navbar.jsx';
import { FaChevronDown } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import {motion} from 'framer-motion';
function Inspection(){
    const [currentStep, setCurrentStep] = useState(2);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrentStep((prev)=>{
                if(prev==4){
                    return 0;
                }
                return prev+1;
            })
        },800);

        return ()=>clearInterval(interval);
    },[])

    
    const[formData,setFormData]=useState({
        equipmentId:"",
        location:"",
        inspectorName:"",
        inspectorPhone:"",
        inspectionDate:"",
        inspectionType:"Routine Inspection",
        notes:""
    });

    const[equipments,setEquipments]=useState([]);

    useEffect(() => {

    const fetchEquipments=async()=>{

        try {

            // Get the currently logged-in Firebase user
            const user=auth.currentUser;

            if(!user){
                console.log("User is not logged in");
                return;
            }

            // Get Firebase ID token
            const token=await user.getIdToken();

            // Get equipment belonging to this user
            const response=await fetch(
                "https://safeguardpro.onrender.com/api/equipment",
                {
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            const data=await response.json();

            if(!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch equipment"
                );
            }

            // Store equipment in React state
            setEquipments(data);

        } catch (error) {

            console.error("Error fetching equipment:", error);

        }
    };

    fetchEquipments();

}, []);
    const handleChange=(e)=>{

        const{name,value}=e.target;

        setFormData((prevData)=>({
        ...prevData,
        [name]:value
    }))}

    const handleEquipmentChange=(e)=>{
        const selectedId=e.target.value;
        const selectedEquipment=equipments.find((item)=>item._id===selectedId);
        setFormData((prevData)=>({
            ...prevData,
            equipmentId: selectedId,
            //location: selectedEquipment ? selectedEquipment.location : ""
        }));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{
            const user=auth.currentUser;
            if(!user){
                alert("Please login first");
                return;
            }
            const token=await user.getIdToken();
            const response=await fetch("https://safeguardpro.onrender.com/api/inspections",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify(formData)
                }
            );
            const data=await response.json();
            console.log("Backend response: ",data);
            if(!response.ok){
                throw new Error(
                    data.message || "Failed to create inspection"
                );
            }
            console.log("Inspection created: ",data);
            alert("Inspection created successfully!");
        }catch(error){
            console.log("Inspection error: ",error)
            alert(error.message)
        }
    };

    return(
        <div>
            <Navbar />
            <div className='min-h-screen bg-white px-5 py-6 sm:px-8 lg:px-12'>
                <div className='text-2xl font-bold text-gray-900'>
                    <motion.h1 
                    initial={{opacity:0,x:-30}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.5}}
                    className='text-2xl font-bold text-gray-900'>
                        New Inspection
                    </motion.h1>

                    <motion.p 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='mt-1 text-sm text-gray-500'>Fill in the details to create a new inspection</motion.p>

                    <div className='relative mt-8 mb-10'>
                        <div className='flex items-start justify-between'>

        {/* Step 1 */}
        <div className='flex flex-1 items-start'>

            <div className='flex flex-col items-center'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-500 ${
                        currentStep >= 1
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    1
                </motion.div>

                <span className={`mt-2 text-sm font-semibold ${
                    currentStep >= 1
                        ? 'text-gray-900'
                        : 'text-gray-700'
                }`}>
                    Basic Info
                </span>
            </div>

            {/* Arrow */}
            <motion.div 
            animate={{
                x:currentStep>= 2?[0, 5, 0] : 0
            }}
            transition={{
                duration: 0.6,
                repeat:currentStep>= 2?Infinity : 0
             }}
            className='flex flex-1 items-center justify-center px-2 mt-5'>
                <FaArrowRight
                    className={`transition-all duration-500 ${
                        currentStep >= 2
                            ? 'text-red-500'
                            : 'text-gray-300'
                    }`}
                />
            </motion.div>

        </div>


        {/* Step 2 */}
        <div className='flex flex-1 items-start'>

            <div className='flex flex-col items-center'>
                <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4,delay:0.1 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-500 ${
                        currentStep >= 2
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    2
                </motion.div>

                <span className={`mt-2 text-sm font-semibold ${
                    currentStep >= 2
                        ? 'text-gray-900'
                        : 'text-gray-700'
                }`}>
                    Checklist
                </span>
            </div>

            {/* Arrow */}
            <motion.div 
            animate={{
                x: currentStep >= 2 ? [0, 5, 0] : 0
            }}
            transition={{
                duration: 0.6,
                repeat: currentStep >= 2 ? Infinity : 0
             }}
            className='flex flex-1 items-center justify-center px-2 mt-5'>
                <FaArrowRight
                    className={`transition-all duration-500 ${
                        currentStep >= 3
                            ? 'text-red-500'
                            : 'text-gray-300'
                    }`}
                />
            </motion.div>

        </div>


        {/* Step 3 */}
        <div className='flex flex-1 items-start'>

            <div className='flex flex-col items-center'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.4,delay:0.2}}
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-500 ${
                        currentStep >= 3
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    3
                </motion.div>

                <span className={`mt-2 text-sm font-semibold ${
                    currentStep >= 3
                        ? 'text-gray-900'
                        : 'text-gray-700'
                }`}>
                    Evidence
                </span>
            </div>

            {/* Arrow */}
            <motion.div 
            animate={{
                x:currentStep >= 2 ? [0, 5, 0] : 0
             }}
            transition={{
                duration: 0.6,
                repeat: currentStep >= 2 ? Infinity : 0
             }}
            className='flex flex-1 items-center justify-center px-2 mt-5'>
                <FaArrowRight
                    className={`transition-all duration-500 ${
                        currentStep >= 4
                            ? 'text-red-500'
                            : 'text-gray-300'
                    }`}
                />
            </motion.div>

        </div>


        {/* Step 4 */}
        <div className='flex flex-col items-center'>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4,delay:0.3 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-500 ${
                    currentStep >= 4
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                }`}
            >
                4
            </motion.div>

            <span className={`mt-2 text-sm font-semibold ${
                currentStep >= 4
                    ? 'text-gray-900'
                    : 'text-gray-700'
            }`}>
                Review
            </span>

        </div>

    </div>

                        <div className='space-y-5'>
                           <div>
                             <label 
                             
                             className="mb-2 block text-sm font-semibold text-gray-800 py-4">
                                Select location
                             </label>

                             <div className='relative'>
                                <input 
                                type='text'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='enter the location'
                                className='w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-black text-sm outline-none focus:border-red-500'></input>
                             </div>
                           </div>

                           <div>
                             <label className='mb-2 block text-sm font-semibold text-gray-800'>
                                Inspector Name
                             </label>

                             <input 
                              type='text'
                              name="inspectorName"
                              value={formData.inspectorName}
                              onChange={handleChange}
                              placeholder='enter the inspectior name'
                              className='w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-500'/>
                             
                           </div>

                           <div>
                            <label className='mb-2 block text-sm font-semibold text-gray-800'>
                                Inspector WhatsApp Number
                             </label>

                            <input
                            type='tel'
                            name="inspectorPhone"
                            value={formData.inspectorPhone}
                             onChange={handleChange}
                            placeholder='enter inspector WhatsApp number'
                            className='w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-500'/>
                        </div>

                           <div>
                              <label className='mb-2 block text-sm font-semibold text-gray-800 outline-none focus:border-red-500'>
                                Inspection Date
                              </label>
                              <div className='relative py-2'>
                                <input
                                 type='date'
                                 name='inspectionDate'
                                 value={formData.inspectionDate}
                                 onChange={handleChange}
                                
                                 className='w-full rounded-lg border-2 border-gray-200 px-4 py-3 pr-12 text-sm outline-none:border-red-500'
                                />

                                
                              </div>
                           </div>
                        </div>

                        <div>
                            <label className='mb-2 block text-sm font-semibold text-gray-800'>
                                Inspection Type
                            </label>

                            <div className='relative py-2'>
                                <select
                                name='inspectionType'
                                value={formData.inspectionType}
                                onChange={handleChange}
                                className='w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-500'>
                                    <option>Routine Inspection</option>
                                    <option>Emergency Inspection</option>
                                    <option>Annual Inspection</option>
                                </select>

                                <FaChevronDown
                                   size={13}
                                   className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
                                  />
                            </div>
                        </div>

                        <div>
                            <label className='mb-2 block text-sm font-semibold text-gray-800'>
                                Notes (Optional)
                            </label>
                            <textarea
                            name='notes'
                            onChange={handleChange}
                            value={formData.notes}
                             row="4"
                             placeholder="Add any notes..."
                             className='w-full resize-none rounded-lg border-2 border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-black-400 focus:border-red-500'
                            ></textarea>
                        </div>

                        <div className='flex justify-end pt-2'>
                            <motion.button 
                            whileHover={{scale:1.03}}
                            whileTap={{scale:0.97}}
                            onClick={handleSubmit}
                            className='flex items-gap-3 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-red-700'>
                                <span className='text-sm'>Send to whatsapp</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Inspection;