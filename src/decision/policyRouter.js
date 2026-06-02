/**
 * Policy Router - Central Decision Making Engine
 * Escolhe a melhor estratégia baseado na política da empresa
 */

export function policyRouter(payload) {
  const { tenant, prompt, autopilotResult, economySimulation, policy = "balanced" } = payload;

  // Extrai informações do diagnóstico
  const diagnostic = autopilotResult?.diagnostic || {};
  const strategies = autopilotResult?.strategies || [];

  // Define critérios baseado na política
  const policies = {
    quality: {
      name: "Qualidade Máxima",
      weights: { quality: 0.6, cost: 0.2, speed: 0.2 },
      description: "Prioriza melhor resultado, independente do custo"
    },
    cost: {
      name: "Menor Custo",
      weights: { cost: 0.6, quality: 0.2, speed: 0.2 },
      description: "Prioriza economia, aceita qualidade menor"
    },
    balanced: {
      name: "Equilibrado",
      weights: { quality: 0.4, cost: 0.3, speed: 0.3 },
      description: "Balanço entre qualidade, custo e velocidade"
    },
    speed: {
      name: "Máxima Velocidade",
      weights: { speed: 0.6, quality: 0.2, cost: 0.2 },
      description: "Prioriza execução rápida"
    }
  };

  const selectedPolicy = policies[policy] || policies.balanced;

  // Avalia cada estratégia com a política escolhida
  const evaluatedStrategies = strategies.map(strategy => {
    const score = (
      (strategy.qualityScore || 0) * selectedPolicy.weights.quality +
      (100 - (strategy.costScore || 50)) * selectedPolicy.weights.cost +
      (strategy.speedScore || 0) * selectedPolicy.weights.speed
    );

    return {
      ...strategy,
      policyScore: score,
      policy: selectedPolicy.name
    };
  });

  // Ordena por melhor score
  evaluatedStrategies.sort((a, b) => b.policyScore - a.policyScore);

  const best = evaluatedStrategies[0] || {
    name: "Default Strategy",
    description: "Estratégia padrão",
    provider: "openai",
    policyScore: 50,
    qualityScore: 50
  };

  return {
    policy: selectedPolicy,
    diagnostic,
    evaluatedStrategies,
    best,
    justification: `Estratégia escolhida com base na política "${selectedPolicy.name}": ${selectedPolicy.description}`,
    timestamp: new Date().toISOString()
  };
}

export default policyRouter;
