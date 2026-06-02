import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requests por window
  message: 'Muitas requisições deste IP, tente novamente depois.',
  standardHeaders: true,
  legacyHeaders: false
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // máximo 5 tentativas de login
  message: 'Muitas tentativas de login, tente novamente depois.',
  skipSuccessfulRequests: true
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 requests de IA por minuto
  message: 'Limite de requisições de IA atingido'
});

export default apiLimiter;