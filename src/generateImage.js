import axios from 'axios'; 

const generateImage = async(prompt) =>{
    const response = await axios.get("http://localhost:8080/create", {
      params: {prompt},
      headers: {
        'Content-Type': 'application/json'
    }
      });
    console.log('REDSPONSE IS ', response)
    
}

export default generateImage