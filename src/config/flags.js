export const flags = {

  GEMINI:
    process.env.ENABLE_GEMINI === 'true',

  OPENAI:
    process.env.ENABLE_OPENAI === 'true',

  ANALYTICS:
    process.env.ENABLE_ANALYTICS === 'true',

  CACHE:
    process.env.ENABLE_CACHE === 'true',

  FAILOVER:
    process.env.ENABLE_FAILOVER === 'true'

};
