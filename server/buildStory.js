const createScript = require('./createScript');
const createSound = require('./createSound');
const { generateImage } = require('./generateImageBackend');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const RATE_LIMIT_DELAY_MS = 60000; // 60 seconds for a minute delay
const MAX_REQUESTS_PER_MINUTE = 6;

const buildStory = async (description, genres) => {
    try {
        const script = await createScript( description, genres );
        const soundRequests = [];
        const { style, folderTitle } = script;
        const storyPath = `../public/story/${folderTitle}`;
        const storyCharacters = Object.keys(script.charactersDescription);

        // Process sound requests
        script.frames.forEach((frame, indx) => {
            const voiceType = script.charactersDescription[frame.sound.type]?.voiceType || 'nova';
            soundRequests.push(createSound(frame.sound, `${storyPath}/frame-${indx}.mp3`, voiceType));
        });

        // // Wait for all sound requests to complete
        await Promise.all(soundRequests);

        // Process image requests in batches
        let previousScenes = [];
        for (let i = 0; i < script.frames.length; i += MAX_REQUESTS_PER_MINUTE) {
            const batch = script.frames.slice(i, i + MAX_REQUESTS_PER_MINUTE);

            await Promise.all(batch.map(async (frame, indx) => {
                let charactersInFrame = [];
                storyCharacters.forEach((character) => {
                    if (frame.image.includes(character)) {
                        charactersInFrame.push(character);
                    }
                });
    
                let currentImagePrompt = '';
                console.log('charactersInFrame.length', charactersInFrame.length);
    
                if (charactersInFrame.length) {
                    const characterInfo = charactersInFrame.map((character) => (`${character}: ${JSON.stringify(script.charactersDescription[character].description)}`));
                    currentImagePrompt += `Title ${script.title}:
                    Image style: ${style} Characters: #${characterInfo}#`;
                }
    
                currentImagePrompt += `
                    ##${frame.image}## 
                    ${previousScenes.length ? `Use context from the previous Previous scenes which were: ${previousScenes }.`: ''} 
                    Don't add text in the image.
                `;
                previousScenes.push(frame.image);
                // Generate image directly, within the batch
                return generateImage(currentImagePrompt, `${storyPath}/image-${i + indx}.png`);
            }));

            if (i + MAX_REQUESTS_PER_MINUTE < script.frames.length) {
                // Wait before processing the next batch, but only if there are more images to process
                await delay(RATE_LIMIT_DELAY_MS);
            }
        }
        console.log('STORY GENERATED !')
        return 200;
    } catch (e) {
        console.log('ERROR BUILDING STORY ', e);
        return e;
    }
};

module.exports = buildStory;
