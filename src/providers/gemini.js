import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function analyzeWithGemini(payload) {
  const { prompt, temperature = 0.7, maxTokens = 1000, model = 'gemini-2.0-flash' } = payload;

  try {
    const generativeModel = genAI.getGenerativeModel({ model });
    
    const response = await generativeModel.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Sistema: Você é um analista estratégico especializado em IA e negócios. Analise o seguinte com profundidade:\n\n${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens
      }
    });

    const content = response.response.text();
    // Estimativa de tokens (Gemini usa caracteres para cálculo)
    const tokens = Math.ceil(content.length / 4);
    const cost = (tokens / 1000000) * 0.0075; // Gemini pricing (muito mais barato)

    return {
      provider: 'Gemini',
      model,
      text: content,
      tokens,
      cost,
      quality: 0.88,
      speed: 400, // Gemini é mais rápido
      timestamp: new Date().toISOString(),
      finishReason: response.response.candidates[0].finishReason
    };
  } catch (error) {
    console.error('Gemini Error:', error.message);
    return {
      provider: 'Gemini',
      error: error.message,
      fallback: true,
      timestamp: new Date().toISOString()
    };
  }
}

export async function streamWithGemini(prompt, onChunk) {
  try {
    const generativeModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const stream = await generativeModel.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
    });

    let fullContent = '';
    for await (const chunk of stream) {
      const content = chunk.text();
      if (content) {
        fullContent += content;
        onChunk(content);
      }
    }
    return fullContent;
  } catch (error) {
    console.error('Gemini Stream Error:', error);
    throw error;
  }
}

export default analyzeWithGemini;