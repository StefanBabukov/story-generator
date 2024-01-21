    const { OpenAI } = require('openai');
    const fs = require('fs');
    const path = require('path');

    const createSound = async (prompt, pathToSave, voiceType) => {
        const openai = new OpenAI();

        try {
            console.log('CREATING SOUND WITH PROMPT ', prompt , pathToSave);
            const response = await openai.audio.speech.create({
                model: "tts-1",
                voice: voiceType,
                input: prompt.content,
            });

            // Write the audio data to a file
            const buffer = Buffer.from(await response.arrayBuffer());
            await fs.promises.writeFile(pathToSave, buffer);

            console.log(`Audio file created at ${pathToSave}`);
        } catch (error) {
            console.error('Error creating audio file:', error);
        }
    };

    module.exports = createSound;
