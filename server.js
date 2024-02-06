
// require('dotenv').config();

// const PORT = 8000;
// const express = require('express');
// const cors = require('cors');
// const mysql = require("mysql");
// const fetch = require('node-fetch'); 

// const app = express();

// app.use(express.json());
// app.use(cors());

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'innovation_ai',
// });

// const conversationHistory = [];

// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM innovation_ai.ai_api_instruction";
//     connection.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         else
//             return res.json(data);
//     });
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


//-----------------------------------------------------------------------------------------
require('dotenv').config();
 
const PORT = 8000;
const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");
const fetch = require('node-fetch');
 
const app = express();
 
app.use(express.json());
app.use(cors());
 
async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'innovation_ai',
    });
    return connection;
}
 
const conversationHistory = [];
 
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
 
    // Add user's message to the conversation history
    conversationHistory.push({ role: "user", content: userMessage });
 
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: conversationHistory,
            max_tokens: 1000,
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