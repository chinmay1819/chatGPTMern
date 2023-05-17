import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;
const configuration = new Configuration({
    organization: process.env.ORG_KEY,
    apiKey: process.env.KEY
})
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {

    const {message}=req.body;
    console.log(req.body);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: `${message}` },
        ]
    })
    
    res.json({
        completion:completion.data.choices[0].message.content
    })
})
app.get('/test',(req,res)=>{
    res.json({
        message:"all is well"
    })
})
app.listen(port,()=>{
    console.log(`Listening...`);
})

