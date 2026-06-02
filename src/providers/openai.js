import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeWithOpenAI(payload) {
  const { prompt, temperature = 0.7, maxTokens = 1000, model = 'gpt-4' } = payload;

  try {
    const response = await openai.chat.completions.create({
      model,
      temperature,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: 'Você é um analista de IA especializado em estratégias de negócio. Analise com precisão e profundidade.' },
        { role: 'user', content: prompt }
      ]
    });

    const content = response.choices[0].message.content;
    const tokens = response.usage.total_tokens;
    const cost = (tokens / 1000) * 0.03; // GPT-4 pricing

    return {
      provider: 'OpenAI',
      model,
      text: content,
      tokens,
      cost,
      quality: 0.95,
      speed: 800,
      timestamp: new Date().toISOString(),
      finishReason: response.choices[0].finish_reason
    };
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    return {
      provider: 'OpenAI',
      error: error.message,
      fallback: true,
      timestamp: new Date().toISOString()
    };
  }
}

export async function streamWithOpenAI(prompt, onChunk) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: 'Você é um assistente de IA avançado.' },
        { role: 'user', content: prompt }
      ],
      stream: true
    });

    let fullContent = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullContent += content;
        onChunk(content);
      }
    }
    return fullContent;
  } catch (error) {
    console.error('OpenAI Stream Error:', error);
    throw error;
  }
}

export default analyzeWithOpenAI;