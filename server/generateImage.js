const axios = require('axios')

const generateImage = async(prompt) =>{
    console.log('GENERATING IMAGE FOR SCENE : ', prompt)
    const { OPENAI_API_KEY } = process.env;
    try {
        const response = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            prompt: prompt,
            n: 1,                                //define the number of images
            size: '512x512',                     //define the resolution of image
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
    
        console.log('RESPONSE IS ' ,response.data);
        return(response.data.data[0].url);

        // Handle the response here, e.g., extract image data and display or save it.
      } catch (error) {
        console.error('Error:', error.response.data);
      }
 }
    module.exports = generateImage