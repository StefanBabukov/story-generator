import axios from 'axios'


const buildStoryScript = async(storyData) =>{
    const response = await axios.get("http://localhost:8080/create-script",{
        params: {storyData},
        headers: {
          'Content-Type': 'application/json'
      }
    });

    const script = response.data
    console.log('SCRIPT ', script)
    return script
}

export default buildStoryScript;