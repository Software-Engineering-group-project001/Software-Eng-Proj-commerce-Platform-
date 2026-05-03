const Groq = require('groq-sdk');
const products = require('../data.json');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chatWithAI = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: `You are CampusCart AI, a helpful shopping assistant for Towson University students.
You help students find course materials and products on the CampusCart platform.
Here are the available products: ${JSON.stringify(products.products)}
Answer questions about products, recommend items based on budget or course, and assist with general shopping questions.
Keep responses short and friendly.`
                },
                { role: 'user', content: message }
            ]
        });

        const response = completion.choices[0].message.content;
        res.json({ reply: response });
    } catch (error) {
        console.error('Groq API error:', error);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
};

module.exports = { chatWithAI };