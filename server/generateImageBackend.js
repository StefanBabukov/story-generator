const axios = require('axios');
const { OpenAI } = require('openai');
const fs = require('fs');
const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
    api_key: OPENAI_API_KEY,
  })
const modifyPrompt = async (prompt, error)=>{
    
    const correctionPrompt=`Here is a prompt intended for image generation with DALL·E that didnt work generating the image.
    This was the image prompt: #${prompt}# and this was the error, #${error}#.
    Judging by the failed prompt and the provided error information, rewrite this prompt to be used to successfully generate an image
    in the dalle model. It's important to keep the main visual elements and the essence of the scene. The image essentially needs to be 
    as close as possible to the original image, corrected with account to what the error mentioned was.
    Your answer needs to be the revised prompt only.
    `
    console.log('Trying to revise prompt for image: ', correctionPrompt)
    const completionModel = "gpt-3.5-turbo"; // Use the appropriate model version

    try {
        const response = await openai.chat.completions.create({
            model: completionModel,
            messages: [{role: "user", content: correctionPrompt}],
            max_tokens: 100 // Adjust based on your needs
        });
        const adjustedPrompt = await response.choices[0].message.content;
        console.log('PROMPT REVISED')
        return adjustedPrompt;
    } catch (error) {
        console.error(`Error adjusting prompt with ${completionModel}:`, error);
        return prompt;
    }
}

const refactorPrompt = async (rawPrompt)=>{
    const correctionPrompt=`I'm trying to generate images for a story. Here is the raw story script so far:
    #${rawPrompt}#. Use the context about the previous scenes and character information to come up with a prompt which will be sent 
    to dalle to generate an image for the last scene. The prompt should include enough information to depict exactly what the current scene 
    and its characters look like. Make sure the prompt you give me will be accepted by dalle.
    Make sure you include every information such as the title, style, and etc. so that all of the different images have a consistent style 
    `
    console.log('generating better image prompt')
    const completionModel = "gpt-3.5-turbo"; // Use the appropriate model version

    try {
        const response = await openai.chat.completions.create({
            model: completionModel,
            messages: [{role: "user", content: correctionPrompt}],
            max_tokens: 100 // Adjust based on your needs
        });
        const adjustedPrompt = await response.choices[0].message.content;
        console.log('REFACTORED PROMPT WITH ', completionModel)
        return adjustedPrompt;
    } catch (error) {
        console.error(`Error REFACTORED prompt with ${completionModel}:`, error);
        return prompt;
    }
}

const generateImage = async (prompt, pathToSave, attempt = 1, maxRetries = 3) => {
    console.log('GENERATING IMAGE FOR SCENE:', prompt);
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: "1024x1024",
        });

        const imageURL = response.data[0].url;
        console.log('IMAGE GENERATED', imageURL);

        // Download and save the image
        const imageResponse = await axios({
            url: imageURL,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(pathToSave);

        imageResponse.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`Image saved in ${pathToSave}`);
                resolve();
            });
            writer.on('error', reject);
        });

    } catch (error) {
        console.error('Error:', error);
        if (attempt <= maxRetries) {
            const modifiedPrompt = await modifyPrompt(prompt, error); // Function to adjust the prompt
            console.log(`Retrying with modified prompt: ${modifiedPrompt}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay before retry
            return generateImage(modifiedPrompt, pathToSave, attempt + 1, maxRetries);
        } else {
            throw new Error(`Failed to generate image after ${maxRetries} attempts.`);
        }    
    }
};

module.exports = {generateImage, refactorPrompt};
