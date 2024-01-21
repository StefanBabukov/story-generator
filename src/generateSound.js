import axios from 'axios'; 

const generateSound = async(prompt, pathToSave, voiceType) =>{
    const response = await axios.get("http://localhost:8080/create-sound", {
      params: {prompt, pathToSave, voiceType},
      headers: {
        'Content-Type': 'application/json'
    }
      });
    console.log('RESPONSE IS ', response)
    return response;
}

export default generateSound