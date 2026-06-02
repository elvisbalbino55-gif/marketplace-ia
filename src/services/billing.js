export function billing(provider){

  const prices = {

    openai:{
      cost:1.00,
      revenue:2.50
    },

    gemini:{
      cost:0.40,
      revenue:1.50
    },

    claude:{
      cost:0.90,
      revenue:2.10
    }

  };

  const current = prices[provider];

  return {

    provider,

    cost:current.cost,

    revenue:current.revenue,

    profit:
      (
        current.revenue -
        current.cost
      )

  };

}
