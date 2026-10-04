import axios from "axios";

const invokeUrl =
    "https://integrate.api.nvidia.com/v1/chat/completions";

const analyzeReport = async (req, res) => {

    // fetching the file from Report.jsx (image)

    try {

        const image = req.file;
        console.log(image);

        // declaring the NVIDIA API key from .env

       const apiKey = process.env.NVIDIA_API_KEY;
       if(!image){
            return res.status(400).json({
                message: "Image is required"
            });
        }

        // checking the API key of NVIDIA

        if(!apiKey){
            return res.status(500).json({
                message: "NVIDIA API key is missing"
            });
        }

        // converting image to Base64

        const imageBase64 = image.buffer.toString("base64");
        const imageData =
            `data:${image.mimetype};base64,${imageBase64}`;

        const headers={
            "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
            "Accept": "application/json"
        };

        const payload={

            messages:[
                {
                    role: "user",

                    content:[
                        {
                            type:"text",
                            text:`You are a fire-safety inspection assistand.
                                  Analyze only what is visibly present in the image
                                  Return the result in exactly this JSON structure
                                  {
                                    "summary":"short summary",
                                    "riskLevel":"Low|Moderate|High",
                                    "issusFound":0,
                                    "recommendation":"recommended action",
                                    "issues":[
                                       {
                                         "name":"issue name",
                                         "severity":"Low | Moderate | High" 
                                       }
                                     ]

                                   }

                                  Return ONLY the JSON object.
                                  Do not include any explanation or text outside the JSON.
                                  `
                        },

                        {
                            type:"image_url",

                            image_url:{
                                url:imageData
                            }
                        }
                    ]
                }
            ],

            model:"nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
            max_tokens:65536,
            reasoning_budget:16384,
            stream:false,
            temperature:0.6,
            top_p:0.95
        };

        const response = await axios.post(
            invokeUrl,
            payload,
            {
                headers: headers
            }
        );

        console.log(JSON.stringify(response.data));

        return res.status(200).json(response.data);

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        return res.status(500).json({
            message: error.response?.data || error.message
        });
    }
};

export { analyzeReport };