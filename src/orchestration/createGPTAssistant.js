const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = process.env;

const createGPTAssistant = async()=>{
const openai = new OpenAI({
    api_key: OPENAI_API_KEY,
  })

  const prompt = ` You need to output a script in json format specified in the end of the answer. You have to be as creative, 
  interesting, unpredictable, use plot twists to write a story based on the input provided by the user. 
  An example prompt sent to you will be : 'description: <can be anything giving any context about a story>, genres: <genres input by the user>'
  - Develop characters with clear backgrounds. Include age, gender, and physical descriptions.
  - Structure the story with a beginning, middle, and end. Ensure plot consistency and a proper conclusion.
  - Incorporate elements like plot twists, climaxes, and various endings.
  - Describe each scene in detail, including visual elements and dialogue, suitable for image AI processing. You need to include
  context of the story in the image prompt to make sure that each image relates to each other, being in the same story, needs to have the 
  same style and scenes need to be drawn as similar to each other as possible throughout the story. Take all this into account for the image output
  that you give.
  - Include character names in hashes (e.g., #John#) in scenes for clarity.
  - Choose a voiceType for each character for the openai text to speech ai choose one of these values - [alloy, echo, fable, onyx, nova, 
   shimmer]
  - Generate the script in a structured JSON format for easy processing.
  - Use a full answer to write as much as you can and make sure the story concludes.
  - Choose a title for the story and image style which has to define the overall characteristic of the comic. If its live-action, 
  animated, what animation style and etc. for the image ai generation
  - Try to include at least 8 scenes in the story

  Your answer ABSOLUTELY NEEDS to be in the json format, so that it can be used by software:
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
  const assistant = await openai.beta.assistants.create({
    name: "Script Writer",
    instructions: prompt,
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-turbo-preview"
  });


  const myAssistants = await openai.beta.assistants.list({
    order: "desc",
    limit: "20",
  });

  console.log('created assisntant', assistant.id);
}

createGPTAssistant();