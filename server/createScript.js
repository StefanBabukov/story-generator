const tiktoken = require('tiktoken')
const { OpenAI } = require('openai');
const mockResponse = require('../public/sample_script')
const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
    api_key: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })

const createScript = async() =>{
    console.log('BUILDING STORY')

    const prompt = `Based on the user's input of a story themed around a "magical dinosaur" in the genres of "comedy" and
    "horror", craft a short film script. You have to generate the characters and keep the consistency of the plot.
    1. Ensure the story has a beginning, middle, and end, with a consistent plot and a proper conclusion. 
    2. Use plot twists, bad turn of events, happy endings, bad endings, culmination and epilogue. Your possibilities of story telling are limitless. Use the best knowledge of story telling, following best known to construct the story.
    
    3. The script should describe each frame with its image specification where the current situation/scenery of the frame is comprehensively described, narration/voice lines.  
    4. Utilise all of your creativeness to fill in the gaps inside the the outlines and specifications mentioned of the video. 
    5. Use as many tokens as possible to write the story and make sure its interesting and concludes within the answer you provide
    6. Make sure you specify what the image looks like as detailed as possible, and if you are showing a specific thing like a person/place/object, describe how it looks like as best as possible so that it can be fed to imageAI. 
    7. Before you start the story, your first answer should be giving information about the characters in this story, such as age, gender, and a comprehensive description of how they look like.
    8. When you output the script and character information, do it in an order that can be processed in javascript as if it was an api call. Like an object which follows this form:
    {charactersDescription:
       {name1: <how they look like>
       name2,name3 .....
        }
     frames:[
        {
            image: <image specification>
            sound:{ type: <Narator/character name> content: <what is being said>
        }
        ]
    }`

    // const configuration = new Configuration({ apiKey: process.env.CHATGPTKEY });
    // const { OPENAI_API_KEY } = process.env;

    // const openai = new OpenAI({
    //     apiKey: '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', dangerouslyAllowBrowser: true
    //   })
    const completionModel = 'gpt-4'
    const totalMaxTokens = 8192
    const encoding = tiktoken.encoding_for_model(completionModel)
    const promptTokenCount = encoding.encode(prompt).length + 7

    // const completion = await openai.chat.completions.create({
    //     model: completionModel,
    //     messages: [{role: "user", content: prompt}],
    //     max_tokens: totalMaxTokens - promptTokenCount
    //   });
    const completion = mockResponse()
    // console.log('DATA IS ', completion)
    return completion.choices[0].message.content
}

module.exports = createScript;