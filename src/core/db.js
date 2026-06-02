export const db = {

  users: [],

  tenants: [],

  logs: [],

  analytics: [],

  providers: [

    {
      name:'gpt4',
      active:true,
      averageCost:1.00
    },

    {
      name:'gemini_flash',
      active:true,
      averageCost:0.40
    },

    {
      name:'claude',
      active:true,
      averageCost:0.90
    }

  ]

};
