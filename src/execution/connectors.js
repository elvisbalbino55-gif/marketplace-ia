export const connectors = {

internal: {
execute: async (action) => {
return { status: "internal_executed", action };
}
},

shopify: {
execute: async (action) => {
return { status: "shopify_ready", action };
}
},

stripe: {
execute: async (action) => {
return { status: "stripe_ready", action };
}
},

whatsapp: {
execute: async (action) => {
return { status: "whatsapp_ready", action };
}
},

ads: {
execute: async (action) => {
return { status: "ads_ready", action };
}
},

crm: {
execute: async (action) => {
return { status: "crm_updated", action };
}
},

email: {
execute: async (action) => {
return { status: "email_sent", action };
}
},

webhook: {
execute: async (action) => {
return { status: "webhook_triggered", action };
}
}

};

export async function executeConnector(action = {}){

const connectorName =
  action.connector ||
  action.provider ||
  "internal";

const connector =
  connectors[connectorName];

if(!connector){
return {
  status:"connector_not_supported",
  connector:connectorName,
  action
};
}

const result =
  await connector.execute(action);

return {
  connector:connectorName,
  ...result
};
}
