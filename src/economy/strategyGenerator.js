export function buildStrategies(payload){

  return [

    {
      name:"growth",
      revenue:120,
      cost:40,
      risk:0.30,
      connector:"ads",
      action:"optimize_campaign"
    },

    {
      name:"balanced",
      revenue:90,
      cost:20,
      risk:0.15,
      connector:"crm",
      action:"update_lead_pipeline"
    },

    {
      name:"efficiency",
      revenue:60,
      cost:10,
      risk:0.05,
      connector:"whatsapp",
      action:"reactivate_leads"
    }

  ];

}
