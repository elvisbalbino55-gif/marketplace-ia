const creditsDB = {
  "empresa_demo_key_123": 100000
};

export function getCredits(apiKey) {
  return creditsDB[apiKey] ?? 0;
}

export function consumeCredit(apiKey, amount = 1) {
  if (!creditsDB[apiKey]) return false;

  if (creditsDB[apiKey] < amount) {
    return false;
  }

  creditsDB[apiKey] -= amount;
  return true;
}