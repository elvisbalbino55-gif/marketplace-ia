export function billing(provider){

  const table = {

    gpt4:{
      cost:1.00,
      sell:2.50
    },

    claude:{
      cost:0.90,
      sell:2.20
    },

    gemini_flash:{
      cost:0.40,
      sell:1.50
    }

  };

  const current = table[provider];

  return {

    provider,

    cost:current.cost,

    revenue:current.sell,

    profit:(current.sell - current.cost),

    margin:
      (
        ((current.sell - current.cost)
        / current.sell) * 100
      ).toFixed(2)

  };

}
