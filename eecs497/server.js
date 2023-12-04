const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post('/api/generate-itinerary', async (req, res) => {
    const formData = req.body;
    const prompt = `...`; // Construct your GPT-3 prompt here

    try {
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });

        res.json({ itinerary: completion.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error generating itinerary');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
