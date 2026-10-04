import axios from 'axios';
import "dotenv/config";

const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
const stream = false;
const prompt = `
You are Safeguard Pro's fire-safety image analysis assistant.

Analyze the uploaded image and identify visible fire-safety equipment.

Report:
1. Equipment type
2. Number of visible items
3. Approximate location in the image
4. Clearly visible damage or abnormalities
5. Important observations

Only report information that can be visually determined.
Do not claim that equipment is certified, compliant,
functional, or safe solely from an image.
`;


async function main() {
  const payload = {
    messages:[
      {
        role:"user",
        content:[
        {
          type:"text",
          text:"What is in this image?"
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
    "model":"nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "max_tokens":65536,
    "reasoning_budget":16384,
    "stream":stream,
    "temperature":0.6,
    "top_p":0.95
  };

  const response = await axios.post(invokeUrl, payload, {
    headers: headers,
  });
  
  if (stream) {
    response.data.on('data', (chunk) => {
      console.log(chunk.toString());
    });
  } else {
    console.log(JSON.stringify(response.data));
  }
}

main().catch(error => {
  if (error.response) {
    console.error(`HTTP ${error.response.status}`);
    if (error.response.data?.on) {
      error.response.data.on('data', (chunk) => console.error(chunk.toString()));
    } else {
      console.error(error.response.data);
    }
  } else {
    console.error(error);
  }
});