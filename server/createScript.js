const tiktoken = require('tiktoken')
const { OpenAI } = require('openai');
const mockResponse = require('../public/sample_script')
const { OPENAI_API_KEY } = process.env;
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
    api_key: OPENAI_API_KEY,
  })
const runWithMock = ()=>{
  const completion = mockResponse()
  return completion;
}
const createScript = async(description, genres) =>{


    console.log('Creating script for ', description, ' genres ', genres)

    const prompt = `Create a short film script based on a story descriptiond around "${description}" in the genre of "${genres}". Follow these guidelines:
    Develop characters with clear backgrounds. Include age, gender, and physical descriptions.
    - Structure the story with a beginning, middle, and end. Ensure plot consistency and a proper conclusion.
    - Incorporate elements like plot twists, climaxes, and various endings.
    - Describe each scene in detail, including visual elements and dialogue, suitable for image AI processing. You need to include
    context of the story in the image prompt to make sure that each image relates to each other.
    - Include character names in hashes (e.g., #John#) in scenes for clarity.
    - Choose a voiceType for each character for the openai text to speech ai choose one of these values - [alloy, echo, fable, onyx, shimmer]
    - Generate the script in a structured JSON format for easy processing.
    - Use a full answer to write as much as you can and make sure the story concludes.
    - Choose a title for the story and image style which has to define the overall characteristic of the comic. If its live-action, 
    animated, what animation style and etc. for the image ai generation
    - Try to include at least 8 scenes in the story
    - Character description needs to be unique and descriptive enough so that the same character can be re created in different scenes.
    - Your answer needs to be a valid parseable json in the format: 
      {
        "title": <title>,
        "style": <style>,
        "charactersDescription": {
          "name1": {description: "<description>", "voiceType": "<chosen voice type>"},
          // More characters
        },
        "frames": [
          {
            "image": "<image specification>",
            "sound": { "type": "<Narrator/Character>", "content": "<dialogue>" }
            // More frame details
          },
          // More frames
        ],
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
    const scriptString = completion.choices[0].message.content;
    console.log('RESPONSE WAS ', completion.choices[0].message)

    const script = JSON.parse(scriptString);
    // Sanitize the title to create a valid directory name
    const sanitizedTitle = script?.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'unknown-story';
    const storyDir = path.join(__dirname, '..', 'public', 'story', sanitizedTitle);

    // Create directory if it doesn't exist
    if (!fs.existsSync(storyDir)){
        fs.mkdirSync(storyDir, { recursive: true });
    }
    const scriptFilePath = path.join(storyDir, 'script.json');
    fs.writeFileSync(scriptFilePath, JSON.stringify(script, null, 2), 'utf8');
    console.log('Script created for ',sanitizedTitle)
    return {...script, folderTitle: sanitizedTitle }
}

module.exports = createScript;