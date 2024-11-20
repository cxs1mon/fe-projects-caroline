const express = require('express');
const axios = require('axios');

const router = express.Router();

// Function to process text with Llama 2 via Ollama
async function processWithOllama(prompt) {
  try {
    const response = await axios.post(
      `${process.env.OLLAMA_API_URL}/api/generate`,
      {
        model: process.env.OLLAMA_MODEL,
        prompt: prompt,
      },
      {
        responseType: 'stream',
      }
    );

    let generatedText = '';

    return new Promise((resolve, reject) => {
      response.data.on('data', (chunk) => {
        const lines = chunk.toString().split('\n');
        for (const line of lines) {
          if (line.trim() !== '') {
            const json = JSON.parse(line);
            if (json.done) {
              resolve(generatedText.trim());
            } else if (json.response) {
              generatedText += json.response;
            }
          }
        }
      });

      response.data.on('end', () => {
        resolve(generatedText.trim());
      });

      response.data.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error('Error communicating with Ollama API:', error.message);
    throw new Error(`Failed to process text with ${process.env.OLLAMA_MODEL} via Ollama`);
  }
}

// Translation Function
async function translateToEmoji(text) {
  const prompt = `Translate the following text into emojis. Replace each word with an emoji, if it doesn't make sense, keep the word unchanged, otherwise try to use emoji's only. And don't add any text, just give the translated text back as emojis.

Text:
${text}

Translated Text:`;

  const translatedText = await processWithOllama(prompt);
  return translatedText;
}

// Translation Endpoint
router.post('/translate', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const translatedText = await translateToEmoji(text);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;