

const mockResponse = ()=>(
   {
        "id": "chatcmpl-8DeXx5Xl4oPZHiGmU6MqMCyaMBe7t",
        "object": "chat.completion",
        "created": 1698264817,
        "model": "gpt-4-0613",
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": {
                      "title": "Bloody Laughter",
                      "style": "Cartoonish human characters in a 90s sitcom style",
                      "charactersDescription": {
                        "Drake": {"description": "Drake, a 200-year-old vampire with a youthful look, pale skin, dark hair, and red eyes; he is a funny, clumsy guy who struggles to adapt to modern life", "voiceType": "Onyx"},
                        "Rita": {"description": "Rita, a 28-year-old lady, short blonde hair, glasses, and somewhat quirky. She accidentally learns Drake's secret", "voiceType": "Nova"},
                        "Bob": {"description": "Bob, an overenthusiastic vampire hunter who is bad at his job, in his 40s, large and clumsy", "voiceType": "Alloy"}
                      },
                    
                      "frames": [
                        {
                          "image": "A neat modern apartment. Drake is sitting on a sofa, watching a 'how-to-use smartphone' tutorial on TV",
                          "sound": { "type": "Drake", "content": "Ugh, I miss the good old days. Why can’t I just send a raven?" }
                        },
                        {
                          "image": "Rita walks through the door",
                          "sound": { "type": "Rita", "content": "Drake, I need your... Oh, are you still trying to figure out how to use a smartphone?" }
                        },
                        {
                          "image": "Rita laughing, Drake looking embarrassed",
                          "sound": { "type": "Drake", "content": "Yeah, terrible at it. I miss letters, so much more.. personal" }
                        },
                        {
                          "image": "Suddenly, the door breaks and Bob enters, wearing a garlic necklace",
                          "sound": { "type": "Bob", "content": "Beware, creature of the night! Your time has come!" }
                        },
                        {
                          "image": "Drake gets scared, hides behind Rita. Bob trying to look intimidating",
                          "sound": { "type": "Rita", "content": "Bob, get out! This is not halloween!" }
                        },
                        {
                          "image": "Bob slipping on a rug, falling down. Drake and Rita laughing",
                          "sound": { "type": "Drake", "content": "I think my biggest threat is diabetes from all the popcorn I eat watching this comedy" }
                        },
                        {
                          "image": "Bob getting up, dusting off, looking embarrassed, Drake and Rita still laughing",
                          "sound": { "type": "Bob", "content": "I'll get you next time, vampire!" }
                        },
                        {
                          "image": "Bob exits through the broken door. Drake and Rita, looking after him, still laughing",
                          "sound": { "type": "Narrator", "content": "And so the day ends, not with a menace, but with hearty laughter. After all, it's all part of being the good amongst the night's creatures." }
                        }
                      ]
                    
                    }   
                },
                "finish_reason": "stop"
            }
        ],
        "usage": {
            "prompt_tokens": 469,
            "completion_tokens": 1058,
            "total_tokens": 1527
        }
})

module.exports = mockResponse