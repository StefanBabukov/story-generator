
const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = process.env;


async function main() {
    const openai = new OpenAI({
        api_key: OPENAI_API_KEY,
      })

    const messages = await openai.beta.threads.messages.list(
        'THREAD ID'
    );

    messages.body.data.forEach((message)=>{
        console.log('THIS IS MESSAGE ', message.id)
        console.log(message.content)
    })
}

main();