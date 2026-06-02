import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function analyzeWithClaude(payload) {
  const { prompt, temperature = 0.7, maxTokens = 1000, model = 'claude-3-5-sonnet-20241022' } = payload;

  try {
    const response = await anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system: 'Você é um analista estratégico com expertise em otimização de processos empresariais. Forneça análises detalhadas e acionáveis.',
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    const content = response.content[0].text;
    const tokens = response.usage.input_tokens + response.usage.output_tokens;
    const cost = (response.usage.input_tokens / 1000000) * 3 + (response.usage.output_tokens / 1000000) * 15; // Claude pricing

    return {
      provider: 'Claude',
      model,
      text: content,
      tokens,
      cost,
      quality: 0.93,
      speed: 650,
      timestamp: new Date().toISOString(),
      stopReason: response.stop_reason
    };
  } catch (error) {
    console.error('Claude Error:', error.message);
    return {
      provider: 'Claude',
      error: error.message,
      fallback: true,
      timestamp: new Date().toISOString()
    };
  }
}

export async function streamWithClaude(prompt, onChunk) {
  try {
    const stream = await anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.7,
      system: 'Você é um assistente de IA avançado.',
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    let fullContent = '';
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        fullContent += chunk.delta.text;
        onChunk(chunk.delta.text);
      }
    }
    return fullContent;
  } catch (error) {
    console.error('Claude Stream Error:', error);
    throw error;
  }
}

export default analyzeWithClaude;