import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const USE_MOCK = true;

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        // 2. The "Hybrid" Logic Gate
        if (USE_MOCK) {
            console.log("--- Running in MOCK MODE (Free) ---");

            return res.json({
                reply: `[MOCK] You said: "${userMessage}". This is a mock response and purpose is to save the API credits.`
            });
        }

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

