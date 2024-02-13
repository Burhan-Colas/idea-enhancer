// require('dotenv').config();
 
// const PORT = 8000;
// const express = require('express');
// const cors = require('cors');
// const mysql = require("mysql2/promise");
// const fetch = require('node-fetch');
 
// const app = express();
 
// app.use(express.json());
// app.use(cors());

// const conversationHistory = [];
 
// async function getConnection() {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'innovation_ai',
//     });
//     return connection;
// }
 
 
// app.get("/", async (req, res) => {
//     try {
//         const connection = await getConnection();
//         const [rows] = await connection.query("SELECT * FROM innovation_ai.ai_api_instruction");
//         return res.json(rows);
//     } catch (err) {
//         console.error(err);
//         return res.json("Error");
//     }
// });




 
// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
 
// app.post('/completions', async (req, res) => {
//     const userMessage = req.body.message;
 
//     // Add user's message to the conversation history
//     conversationHistory.push({ role: "user", content: userMessage });
 
//     const options = {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${API_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model: "gpt-4",
//             messages: conversationHistory,
//             max_tokens: 1000,
//         })
//     };
 
//     try {
//         const response = await fetch('https://api.openai.com/v1/chat/completions', options);
//         const data = await response.json();
 
//         // Update conversation history with the model's response
//         conversationHistory.push({ role: "assistant", content: data.choices[0].message.content });
 
//         res.send(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
 
// app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));

//---------------------------------------------------------------------------------------------------------------

require('dotenv').config();
 
const PORT = 8000;
const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");
const fetch = require('node-fetch');
 
const app = express();
 
app.use(express.json());
app.use(cors());

const conversationHistory = [];
 
async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'innovation_ai',
    });
    return connection;
}
 
 
app.get("/", async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT * FROM innovation_ai.ai_api_instruction");
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.json("Error");
    }
});




 
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
 
app.post('/completions', async (req, res) => {
    const userMessage = req.body.message;
    const description = req.body.description;
    const itemsToAnswer = req.body.itemsToAnswer;
    const selectedOption = req.body.selectedOption;
    const AIinstructions = req.body.AIinstructions;
 
    // Add user's message to the conversation history
    if(userMessage != null ){
    conversationHistory.push({ role: "user", content: userMessage });
    }
 
    // Add selected option to the conversation history
    if(selectedOption != null){
    conversationHistory.push({ role: 'user', content: description });
    conversationHistory.push({ role: 'user', content: itemsToAnswer });
    conversationHistory.push({ role: 'user', content: selectedOption });
    conversationHistory.push({ role: 'user', content: AIinstructions });
    }

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: conversationHistory,
            max_tokens: 200,
        })
    };
 
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
 
        // Update conversation history with the model's response
        conversationHistory.push({ role: "assistant", content: data.choices[0].message.content });
 
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
 
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));

