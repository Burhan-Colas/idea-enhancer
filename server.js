
//-------------------------------------------------------------------------------------------------------------

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const OpenAI = require("openai");

// const openai = new OpenAI({

//     apiKey:"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",

// });


// const app = express ();
// app.use(bodyParser.json());
// app.use(cors());

// app.post("/chat", async (req,res) =>{
//     const {prompt} = req.body;

//     const completion = await openai.chat.completions.create({
//         model: "gpt-4",
//         prompt: prompt,
//         messages: [{ role:"user", content:"how are you?"}]
//     })
//     res.send(completion.data.choices[0].text);
// });


// const PORT = 8000;

// app.listen(PORT, ()=> {
//     console.log(`Server running on port : ${PORT}`);
// });


//---------------------------------------------------------------------------------------------------------

require('dotenv').config();

const PORT = 8000
const express = require('express')
const cors = require('cors')
const mysql = require("mysql");

const app = express()

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'innovation_ai',
  });

  app.get("/", (req, res) => {
  const sql = "SELECT * FROM innovation_ai.ai_api_instruction";
  connection.query(sql, (err, data) => {
    if(err) return res.json("Error");
    else 
    return res.json(data);
})

  })


const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

app.post('/completions', async (req, res) =>{

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            model : "gpt-4",
            messages: [{ role:"user", content: req.body.message}],
            max_tokens: 200,
        })
    }
    try {
       const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))


