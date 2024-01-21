const tiktoken = require('tiktoken')
const { OpenAI } = require('openai');
const mockResponse = require('../public/sample_script')
const { OPENAI_API_KEY } = process.env;
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
    api_key: OPENAI_API_KEY,
  })

const createScript = async(storyData) =>{
    const {     
        theme,
        genres,
    } = storyData;

    console.log('BUILDING STORY')

    const prompt = `Create a short film script based on a story themed around "${theme}" in the genre of "${genres}". Follow these guidelines:

    - Develop characters with clear backgrounds. Include age, gender, and physical descriptions.
    - Structure the story with a beginning, middle, and end. Ensure plot consistency and a proper conclusion.
    - Incorporate elements like plot twists, climaxes, and various endings.
    - Describe each scene in detail, including visual elements and dialogue, suitable for image AI processing.
    - Include character names in hashes (e.g., #John#) in scenes for clarity.
    - Choose a voiceType for each character for the openai text to speech ai choose one of these values - [alloy, echo, fable, onyx, nova, 
     shimmer]
    - Generate the script in a structured JSON format for easy processing.
    - Use a full answer to write as much as you can and make sure the story concludes.
    - Choose a title for the story and image style for the image ai generation
    
    Characters and Scenes Format:
    {
      title: <title>
       style: <style>
      charactersDescription: {
        "name1": {description: "<description>", voiceType: <chosen voice type>},
        // More characters
      },
      "frames": [
        {
          "image": "<image specification>",
          "sound": { "type": "<Narrator/Character>", "content": "<dialogue>" }
          // More frame details
        },
        // More frames
      ]
    }
    `

  
    const completionModel = 'gpt-4'
    const totalMaxTokens = 8192
    const encoding = tiktoken.encoding_for_model(completionModel)
    const promptTokenCount = encoding.encode(prompt).length + 7
    const completion = await openai.chat.completions.create({
        model: completionModel,
        messages: [{role: "user", content: prompt}],
        max_tokens: totalMaxTokens - promptTokenCount
      });
    // const completion = mockResponse()

    const scriptString = await completion.choices[0].message.content;
    const script = JSON.parse(scriptString);
    console.log('SCRIPT ', script, script?.title)
    // Sanitize the title to create a valid directory name
    const sanitizedTitle = script?.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'unknown-story';
    const storyDir = path.join(__dirname, '..', 'public', 'story', sanitizedTitle);

    // Create directory if it doesn't exist
    if (!fs.existsSync(storyDir)){
        fs.mkdirSync(storyDir, { recursive: true });
    }
    
    return {...script, folderTitle: sanitizedTitle }
}

module.exports = createScript;