

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
                        "charactersDescription": {
                          "Barney": {
                            "age": 25000000,
                            "gender": "Male",
                            "looks": "Barney is a benevolent but clumsy T-rex. He is majestic yet oddly charming with vibrant purple scales and a playful squeaky voice. He wears a bowtie that's imbued with magic, glowing a warm golden hue."
                          },
                          "Jilly": {
                            "age": 10,
                            "gender": "Female",
                            "looks": "Jilly is a fearless lass with curly, flaming red hair, freckles, and sparkling emerald eyes that are always filled with mischief. She often wears a yellow dress with an oversized hat."
                          },
                          "GhostRaptors": {
                            "age": 'Unknown',
                            "gender": "Unknown",
                            "looks": "GhostRaptors are spectral dinosaurs with an eerie green glow, sharp claws, terrifying teeth, and blood-chilling screeches."
                          }
                        },
                        "frames": [
                          {
                            "image": "Open on a normal suburbia and slowly pan to a seemingly ordinary house with a sign saying 'Beware of Dinosaur' next to a small wooden treehouse.",
                            "sound": { "type": "Narrator", "content": "Once upon a time, in a small town of Whitshire, lived a quirky family with an even quirkier pet dinosaur..." }
                          },
                          {
                            "image": "The treehouse door creaks open, revealing Barney, the charmingly massive purple T-Rex, as he ducks to get out.",
                            "sound": { "type": "Barney", "content": "Oh, not again! I really need to remember to duck." }
                          },
                          {
                            "image": "Jilly is doing her homework at the kitchen table, trying not to laugh at Barney's clumsiness.",
                            "sound": { "type": "Jilly", "content": "You are 40 feet tall, Barney, how can you forget ducking every time?" }
                          },
                          {
                            "image": "At night, GhostRaptors swarm out of an enchanted forest and creep into town, spreading an eerie fog.",
                            "sound": { "type": "Narrator", "content": "However, one mysterious night, menacing GhostRaptors from the enchanted forest slink into the town, bringing a sense of dread..." }
                          },
                          {
                            "image": "Barney, with a determined look, stands guard by the house, the golden glow of his bowtie intensified.",
                            "sound": { "type": "Barney", "content": "Stay inside, Jilly! I'll protect us!" }
                          },
                          {
                            "image": "Barney, using his magic bowtie, fights off the GhostRaptors with a brilliant display of colorful enchantments.",
                            "sound": { "type": "Narrator", "content": "Fear transformed into laughter as Barney slipped and slid, his clumsy fight against the GhostRaptors turning into a comical spectacle." }
                          },
                          {
                            "image": "The sun rises, the GhostRaptors vanish, and Barney, although tired, stands triumphantly.",
                            "sound": { "type": "Jilly", "content": "Bravo Barney! You are the bravest dinosaur ever!" }
                          },
                          {
                            "image": "The sleepy town of Whitshire now celebrates 'Barney the Brave Day', and life returns to its goofy norm.",
                            "sound": {
                              "type": "Narrator",
                              "content": "From that day forward, the quaint town had a new legend - 'Barney, the clumsy, magical T-Rex'. And life? Well, it was anything but ordinary!"
                            }
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