    const { OpenAI } = require('openai');
    const fs = require('fs');
    const path = require('path');

    const createSound = async (prompt, indx) => {
        const openai = new OpenAI();

        try {
            console.log('CREATING SOUND WITH PROMPT ', prompt , ' ## for scene ', indx);
            const response = await openai.audio.speech.create({
                model: "tts-1",
                voice: "alloy",
                input: prompt.content,
            });
            // Create the file path
            const speechFile = path.join(__dirname, '..', 'story', `frame-${indx}.mp3`);

            // Write the audio data to a file
            const buffer = Buffer.from(await response.arrayBuffer());
            await fs.promises.writeFile(speechFile, buffer);

            console.log(`Audio file created at ${speechFile}`);
        } catch (error) {
            console.error('Error creating audio file:', error);
        }
    };

    module.exports = createSound;
