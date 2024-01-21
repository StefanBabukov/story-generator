import axios from 'axios'; 

const generateSound = async(prompt, indx) =>{
    const response = await axios.get("http://localhost:8080/create-sound", {
      params: {prompt, indx},
      headers: {
        'Content-Type': 'application/json'
    }
      });
    console.log('REDSPONSE IS ', response)
    return response;
}

export default generateSound