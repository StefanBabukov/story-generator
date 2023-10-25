import axios from 'axios'


const buildStoryScript = async() =>{
    const response = await axios.get("http://localhost:8080/create-script");
    // const data = response.json()
    const script = response.data
    console.log('SCRIPT ', script)
    return script
}

export default buildStoryScript;