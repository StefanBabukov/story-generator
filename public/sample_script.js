

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
                      "title": "The Fourth Dimension Dwellers",
                      "style": "futuristic_spacescape",
                      "charactersDescription": {
                        "#Alice#": {
                          "description": "28-year-old female, long silver hair, sky-blue eyes, wears a glowing necklace.",
                          "voiceType": "nova"
                        },
                        "#Bob#": {
                          "description": "30-year-old male, short black hair, brown eyes, wears a suit made of light.",
                          "voiceType": "onyx"
                        },
                        "#Zorxal#": {
                          "description": "ageless 4th-dimensional entity, shape constantly morphing, blindingly radiant.",
                          "voiceType": "alloy"
                        }
                      },
                      "frames": [
                        {
                          "image": "Alice and Bob in a futuristic spaceship cockpit. Both look stunned as they stare at a distant glowing entity in the cosmos.",
                          "sound": {
                            "type": "alia",
                            "content": "Alice to Bob, 'Is... is that...?'"
                          }
                        },
                        {
                          "image": "Bob, looking at a complex 4D map console, pales and nods at Alice.",
                          "sound": {
                            "type": "bob",
                            "content": "Bob to Alice, 'Yes.. it's a fourth-dimensional entity, Zorxal.'"
                          }
                        },
                        {
                          "image": "Alice takes a deep breath, reaches for the spaceship controls and initiates contact.",
                          "sound": {
                            "type": "alice",
                            "content": "'This is Alice of the human spaceship Andromeda, we come in peace.'"
                          }
                        },
                        {
                          "image": "Zorxal's form morphs dramatically, crackling with energies as a voice resonates from the entity.",
                          "sound": {
                            "type": "zorxal",
                            "content": "'Welcome, Alice of Andromeda. I am Zorxal. What do you seek?'"
                          }
                        },
                        {
                          "image": "Alice and Bob exchange nervous glances, then Alice addresses Zorxal, asking for knowledge of the fourth dimension.",
                          "sound": {
                            "type": "alice",
                            "content": "'We wish to learn, Zorxal. Teach us about the fourth dimension.'"
                          }
                        },
                        {
                          "image": "Zorxal pulses brighter, forming a hologram-like 'window' into the fourth dimension. It is an abstract, mesmerizing scene, filled with shifting patterns and impossible shapes.",
                          "sound": {
                            "type": "zorxal",
                            "content": "'Observe carefully!'"
                          }
                        },
                        {
                          "image": "Alice and Bob gaze in awe at the 'window', as their minds open to the alien but fascinating concepts of fourth-dimensional reality.",
                          "sound": {
                            "type": "Narrator",
                            "content": "They felt their minds expanding, transcending their 3D reality."
                          }
                        },
                        {
                          "image": "Zorxal slowly retracts the 'window.' Alice and Bob, looking visibly changed, exchange a knowing smile.",
                          "sound": {
                            "type": "alice",
                            "content": "'Thank you, Zorxal. You’ve shown us a whole new reality.'"
                          }
                        },
                        {
                          "image": "Zorxal's radiance dims. The entity emits a comforting, gentle wave of light, before gently floating away into the cosmic expanse.",
                          "sound": {
                            "type": "zorxal",
                            "content": "'Farewell, young learners. Use this knowledge well.'"
                          }
                        },
                        {
                          "image": "Alice and Bob, changed forever, watch as Zorxal fades away. Their spaceship aimed at their home world.",
                          "sound": {
                            "type": "Narrator",
                            "content": "Armed with newfound knowledge and potentials, they returned home, ready to bring a new dawn to human understanding."
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