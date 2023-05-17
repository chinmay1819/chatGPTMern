import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;
const configuration = new Configuration({
    organization: "org-ZdvsInttkOXWQ8pMHujvKzBt",
    apiKey: "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"
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
    console.log(`Listening on : http://localhost:${port}`);
})

