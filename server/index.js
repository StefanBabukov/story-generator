require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const createScript = require('./createScript');
const generateImage = require('./generateImage')
const createSound = require('./createSound');

app.use(bodyParser.json());
app.use(cors());
app.get("/create-image", async (req, res) => {
  const {prompt, pathToSave} = req.query;

  const imageURL = await generateImage(prompt, pathToSave);    
  res.send(imageURL)
});

app.get('/create-script', async(req, res)=>{
    const storyData = req.query.storyData;
    const completion = await createScript(storyData);
    res.send(completion)
})
app.get('/create-sound', async(req, res)=>{
  const{prompt, pathToSave, voiceType} = req.query;
  const completion = await createSound(prompt, pathToSave, voiceType);
  res.send(completion)
})

const port = 8080
app.listen(port, () => {
  console.log("server started on ", port);
});