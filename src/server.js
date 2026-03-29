import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional assistant. Reply clearly and concisely."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiReply = response.data.choices[0].message.content;

        res.json({ reply: aiReply });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

