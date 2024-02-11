const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = process.env;

async function main() {
    const openai = new OpenAI({
        api_key: OPENAI_API_KEY,
    });
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: '{"description": "can the world survive without toilet paper", "genres": "mystery horror adventure"}'
        }
    );

    await openai.beta.threads.runs.create(
        thread.id,
        { 
            assistant_id: 'ASSISTNAT ID ',
            instructions: "Please address the user as Jane Doe. The user has a premium account."
        }
    );

    console.log(thread.id, ' is the thread id');

    // Poll for messages and wait for the response
    const waitForResponse = async (threadId) => {
        let hasResponse = false;
        while (!hasResponse) {
            // Short delay between polls to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
            const messages = await openai.beta.threads.messages.list(threadId);
            const response = messages.body.data[0]?.content[0]?.text?.value
            console.log('CHECKED FOR STATUS CURRENT RESPONSE IS ', response, ' MESSAGES ARE ', messages )
            const assistantMessage = messages.body.data.find(msg => msg.role === 'assistant');
            if (response) {
                console.log('Assistant message received:', assistantMessage.content.text.value);
                hasResponse = true;
            }
        }
    };

    await waitForResponse(thread.id);
}

main();
