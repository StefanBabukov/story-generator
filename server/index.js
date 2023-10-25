require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const createScript = require('./createScript');
const generateImage = require('./generateImage')


app.use(bodyParser.json());
app.use(cors());
app.get("/create", async (req, res) => {
  console.log('GENERATE IMAGE REQ IS ', req)
  const prompt = req.query.prompt;

  const imageURL = await generateImage(prompt);    
  res.send(imageURL)
});

app.get('/create-script', async(req, res)=>{
    const completion = await createScript();
    res.send(completion)
})

const port = 8080
app.listen(port, () => {
  console.log("server started on ", port);
});