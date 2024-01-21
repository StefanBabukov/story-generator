const axios = require('axios');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const generateImage = async (prompt) => {
    console.log('GENERATING IMAGE FOR SCENE:', prompt);
    const { OPENAI_API_KEY } = process.env;
    const openai = new OpenAI({
        api_key: OPENAI_API_KEY,
    });

    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: "1024x1024",
        });

        const imageURL = response.data[0].url;
        console.log('IMAGE GENERATED', imageURL);

        return imageURL;
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = generateImage;
