const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// EVENT GENERATOR
const generateEventDescription = async (req, res) => {

  try {

    const { title } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: "Generate professional college event descriptions."
        },
        {
          role: "user",
          content: `
          Generate a professional college event description.

          Event Name: ${title}

          Include:
          - summary
          - rules
          - benefits
          - hashtags
          `
        }
      ]
    });

    res.json({
      success: true,
      description: response.choices[0].message.content
    });

  } catch (error) {

    console.log("EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CHATBOT
const chatWithAI = async (req, res) => {

  try {

    const { message } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: "You are Eduverse AI assistant for students."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      success: true,
      reply: response.choices[0].message.content
    });

  } catch (error) {

    console.log("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  generateEventDescription,
  chatWithAI
};