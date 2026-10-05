import React,{useState,useEffect} from 'react';
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import Navbar from '../components/Navbar.jsx';
import { FaPlus } from 'react-icons/fa6';
import { FaFireExtinguisher } from 'react-icons/fa6';
import { FaFire,FaBell,FaSprayCan,FaPumpSoap,FaWater } from 'react-icons/fa6';
import { MdSensors } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa6';
import { MdFireHydrantAlt } from "react-icons/md";
import { auth }  from '../firebase.js';
import { IoCall } from "react-icons/io5";
import { mdiSprinklerFire,mdiWaterPump,mdiStorageTank } from '@mdi/js';
import { FaTemperatureHigh } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { onAuthStateChanged } from 'firebase/auth';

function Equipments(){

    const[open,setOpen]=useState(null);
    const[addOpen,setAddOpen]=useState(false);

    const [equipments,setEquipments]=useState([]);

    const getStatusStyle=(status)=>{
        if(status==="Active"){
            return "bg-green-100 text-green-700";
        }

        if(status==="Maintenance"){
            return "bg-orange-100 text-orange-700"
        }

        if(status==="Inactive"){
            return "bg-gray-100 text-gray-700"
        }

        if(status==="Retired"){
            return "bg-red-100 text-red-700"
        }

        return "bg-gray-100 text-gray-700"
    }

    const handleStatusChange = async (id, newStatus) => {

        try {

            // Get the currently logged-in Firebase user
            const user = auth.currentUser;

            if (!user) {
                alert("Please login first");
                return;
            }

            // Get Firebase ID token
            const token=await user.getIdToken();

            // Send the new status to our backend
            const response = await fetch(
                `https://safeguardpro.onrender.com/api/equipment/${id}`,
                {
                    method:"PATCH",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify({
                        status:newStatus
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update status"
                );
            }

            // Update the UI with the status returned by MongoDB
            setEquipments((prevEquipments) =>
                prevEquipments.map((item) =>
                    item._id === id
                        ? { ...item, status: data.status }
                        : item
                )
            );

            // Close the popup
            setOpen(false);

        }catch(error) {
            console.error("Error updating status:", error);
            alert(error.message);
        }
    };
    
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!user) {
                setEquipments([]);
                return;
            }

            try {

                const token = await user.getIdToken();

                const response = await fetch(
                    "https://safeguardpro.onrender.com/api/equipment",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch equipment"
                    );
                }

                setEquipments(data);

            } catch (error) {
                console.log("Error fetching equipment:", error);
            }

        });

        return () => unsubscribe();

    }, []);

    const [formData,setFormData]=useState({
        name:'',
        equipmentType:'',
        id:'',
        location:'',
        inspection:'',
        status:'Active'
    });

    const handleChange=(e)=>{

        const {name,value}=e.target;

        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            const user=auth.currentUser;

            if(!user){
                alert("Please login first");
                return;
            }

            const token=await user.getIdToken();

            const response=await fetch(
                "https://safeguardpro.onrender.com/api/equipment",
                {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`,
                    },
                    body:JSON.stringify(formData),
                }
            );

            const data=await response.json();

            if(!response.ok){
                throw new Error(
                    data.message||"Failed to Add equipment"
                );
            }
        
            setEquipments((prevEquipments)=>[
                ...prevEquipments,
                formData
            ]);

            setFormData({
                name:'',
                equipmentType:'',
                id:'',
                location:'',
                inspection:'',
                status:'Active'
            });

            setAddOpen(false);

        }catch(error){
            console.log("Error adding equipment: ",error);
            alert(error.message);
        }
    };

    const iconMap = {
        "Fire Extinguisher": <FaFireExtinguisher />,
        "Smoke Detector": <MdSensors />,
        "Fire Hose Reel":<FaFire />,
        "Fire Alarm Panel": <FaBell />,
        "Fire Hydrant":<MdFireHydrantAlt />,
        "Manual call point":<IoCall />,
        "Fire Sprinkler": <FaSprayCan />,
        "Fire pump": <FaPumpSoap />,
        "Fire Water Tank": <FaWater />,
        "Emergency Alarm / Hooter":<FaVolumeUp />,
        "Heat Detector":<FaTemperatureHigh />
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration:0.5}}
            >

            <Navbar />

            <div className='px-4 m-4'>

                <motion.h2 
                initial={{opacity:0,y:-20}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.5,delay:0.2}}
                className='text-2xl font-bold text-gray-900'>
                    Equipments
                </motion.h2>

                <motion.p 
                initial={{opacity:0,y:-20}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.5,delay:0.3}}
                className='font-semibold text-gray-500 mt-1'>
                    Manage all your fire safety equipment
                </motion.p>

            </div>

            <motion.div 

            className='flex w-full items-center justify-center gap-2 mt-5 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 sm:w-fit ml-2 mr-4 sm:ml-auto cursor-pointer'>

                <FaPlus />

                <button onClick={()=>setAddOpen(true)}>
                    Add Equipment
                </button>

                {addOpen && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

                            {/* Header */}

                            <div className="mb-6 flex items-center justify-between">

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Add Equipment
                                </h2>

                                <button
                                    onClick={() => setAddOpen(false)}
                                    className="text-xl text-gray-500 hover:text-gray-900"
                                >
                                    ✕
                                </button>

                            </div>

                            {/* Form */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                {/* Equipment Type */}

                                <div>

                                    <label
                                        className="mb-1 block text-sm font-semibold text-gray-700"
                                    >
                                        Equipment Type
                                    </label>

                                    <select
                                        name="equipmentType"
                                        onChange={handleChange}
                                        value={formData.equipmentType}
                                        className="w-full text-gray-700 rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500"
                                    >

                                        <option value="">
                                            Select equipment type
                                        </option>

                                        <option value="Fire Extinguisher">
                                            Fire Extinguisher
                                        </option>

                                        <option value="Fire Hose Reel">
                                            Fire Hose Reel
                                        </option>

                                        <option value="Fire Hydrant">
                                            Fire Hydrant
                                        </option>

                                        <option value="Smoke Detector">
                                            Smoke Detector
                                        </option>

                                        <option value="Heat Detector">
                                            Heat Detector
                                        </option>

                                        <option value="Fire Alarm Panel">
                                            Fire Alarm Panel
                                        </option>

                                        <option value="Manual Call Point">
                                            Manual Call Point
                                        </option>

                                        <option value="Fire Sprinkler">
                                            Fire Sprinkler
                                        </option>

                                        <option value="Fire Pump">
                                            Fire Pump
                                        </option>

                                        <option value="Fire Water Tank">
                                            Fire Water Tank
                                        </option>

                                        <option value="Emergency Alarm / Hooter">
                                            Emergency Alarm / Hooter
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                                {/* Name */}

                                <div>

                                    <label
                                        className="mb-1 block text-sm font-semibold text-gray-700"
                                    >
                                        Equipment Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Fire Extinguisher - Powder"
                                        className="w-full text-black rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500"
                                    />

                                </div>

                                {/* Equipment ID */}

                                <div>

                                    <label
                                        className="mb-1 block text-sm font-semibold text-gray-700"
                                    >
                                        Equipment ID
                                    </label>

                                    <input
                                        type="text"
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        placeholder="e.g. FE-001"
                                        className="w-full text-black rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500"
                                    />

                                </div>

                                {/* Location */}

                                <div>

                                    <label
                                        className="mb-1 block text-sm font-semibold text-gray-700"
                                    >
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Ground Floor, Near Exit"
                                        className="w-full text-black rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500"
                                    />

                                </div>

                                {/* Inspection */}

                                <div>

                                    <label
                                        className="mb-1 block text-sm font-semibold text-gray-700"
                                    >
                                        Next Inspection
                                    </label>

                                    <input
                                        type="date"
                                        name="inspection"
                                        value={formData.inspection}
                                        onChange={handleChange}
                                        className="w-full text-black rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500"
                                    />

                                </div>

                                {/* Status */}

                                <div>

                                    <label
                                        className="mb-1 block text-sm font-semibold text-gray-700"
                                    >
                                        Status
                                    </label>

                                    <select
                                        value={formData.status}
                                        name='status'
                                        onChange={handleChange}
                                        className="w-full text-black rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500"
                                    >

                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Maintenance">
                                            Maintenance
                                        </option>

                                        <option value="Inactive">
                                            Inactive
                                        </option>

                                        <option value="Retired">
                                            Retired
                                        </option>

                                    </select>

                                </div>

                                {/* Buttons */}

                                <div className="mt-6 flex justify-end gap-3">

                                    <button
                                        type="button"
                                        onClick={() => setAddOpen(false)}
                                        className="rounded-lg border border-gray-300 px-5 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
                                    >
                                        Add Equipment
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}

            </motion.div>

            <div className='m-4 mt-8 space-y-3'>

                {equipments.map((item,index)=>(

                    <div
                        key={index}
                        className='flex flex-col gap-4 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadom-md transition sm:flex-row sm:items-center'
                    >

                        <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl
                         bg-gray-50 text-2xl text-red-600'>

                            {iconMap[item.icon]}

                        </div>

                        <div className='flex-1'>

                            <h3 className='font-bold text-gray-900'>
                                {item.name}
                            </h3>

                            <p className='text-sm text-gray-500 mt-1'>
                                {item.id} {item.location}
                            </p>

                        </div>

                        <div>

                            <p className='text-xs text-gray-500'>
                                Next Inspection
                            </p>

                            <p className='text-sm font-semibold mt-1'>
                                {item.inspection}
                            </p>

                        </div>

                        <span
                            className={`w-fit rounded-md px-3 py-1 text-xs font-semibold ${getStatusStyle(item.status)}`}
                        >
                            {item.status}
                        </span>

                        {/* Status menu */}

                        <div className="relative">

                            {/* Arrow button */}

                            <button onClick={()=>setOpen(open===item._id?null:item._id)}>

                                <FaChevronRight
                                    size={14}
                                    className='absolute-right-0 top-1/2 sm: text-gray-500'
                                />

                            </button>

                            {/* Status popup */}

                            {open === item._id && (
                                <div className="absolute-right-0 sm:absolute-right-0 top-8 z-10 w-56 rounded-xl border-2 bg-white p-4 text-center text-xl font-semibold shadow-2xl space-y-2">

                                    <button
                                        onClick={() => handleStatusChange(item._id, "Active")}
                                        className="w-full text-green-600"
                                    >
                                        Active
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange(item._id, "Maintenance")}
                                        className="w-full text-amber-500"
                                    >
                                        Maintenance
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange(item._id, "Inactive")}
                                        className="w-full text-gray-600"
                                    >
                                        Inactive
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange(item._id, "Retired")}
                                        className="w-full text-red-500"
                                    >
                                        Retired
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </motion.div>
    );
}

export default Equipments;