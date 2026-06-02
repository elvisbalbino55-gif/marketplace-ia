import { analyzeWithOpenAI, streamWithOpenAI } from './openai.js';
import { analyzeWithClaude, streamWithClaude } from './claude.js';
import { analyzeWithGemini, streamWithGemini } from './gemini.js';

/**
 * Provider Router - Escolhe o melhor provider baseado em critérios
 */
export async function routeProvider(payload) {
  const { prompt, strategy = 'balanced', provider = null } = payload;

  // Se provider específico foi solicitado
  if (provider === 'openai') {
    return await analyzeWithOpenAI(payload);
  } else if (provider === 'claude') {
    return await analyzeWithClaude(payload);
  } else if (provider === 'gemini') {
    return await analyzeWithGemini(payload);
  }

  // Estratégia: paralela (mais rápido, mais custo)
  if (strategy === 'parallel') {
    const results = await Promise.allSettled([
      analyzeWithOpenAI(payload),
      analyzeWithClaude(payload),
      analyzeWithGemini(payload)
    ]);

    return {
      strategy: 'parallel',
      results: results.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason }),
      timestamp: new Date().toISOString()
    };
  }

  // Estratégia: econômica (Gemini primeiro, depois fallback)
  if (strategy === 'economical') {
    try {
      return await analyzeWithGemini(payload);
    } catch (error) {
      console.warn('Gemini failed, falling back to Claude');
      return await analyzeWithClaude(payload);
    }
  }

  // Estratégia: qualidade (OpenAI primeiro)
  if (strategy === 'quality') {
    try {
      return await analyzeWithOpenAI(payload);
    } catch (error) {
      console.warn('OpenAI failed, falling back to Claude');
      return await analyzeWithClaude(payload);
    }
  }

  // Estratégia: balanceada (padrão)
  // Tenta OpenAI, depois Claude, depois Gemini
  try {
    const result = await analyzeWithOpenAI(payload);
    if (!result.error) return result;
  } catch (error) {
    console.warn('OpenAI failed:', error.message);
  }

  try {
    const result = await analyzeWithClaude(payload);
    if (!result.error) return result;
  } catch (error) {
    console.warn('Claude failed:', error.message);
  }

  try {
    const result = await analyzeWithGemini(payload);
    if (!result.error) return result;
  } catch (error) {
    console.warn('Gemini failed:', error.message);
  }

  // Se todos falharem
  return {
    error: 'All providers failed',
    timestamp: new Date().toISOString()
  };
}

export {
  analyzeWithOpenAI,
  analyzeWithClaude,
  analyzeWithGemini,
  streamWithOpenAI,
  streamWithClaude,
  streamWithGemini
};