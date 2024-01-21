const axios = require('axios');
const { OpenAI } = require('openai');
const fs = require('fs');

const generateImage = async (prompt, pathToSave) => {
    console.log('GENERATING IMAGE FOR SCENE:', prompt);
    const { OPENAI_API_KEY } = process.env;
    const openai = new OpenAI({
        api_key: OPENAI_API_KEY,
    });

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
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
    }
};

module.exports = generateImage;
