const keys = new Map([
["demo_key",{tenantId:"tenant_demo",plan:"pro"}]
]);

export function apiKeyMiddleware(req,res,next){
const key = req.headers["x-api-key"];

if(!key || !keys.has(key)){
return res.status(401).json({error:"invalid api key"});
}

const data = keys.get(key);

req.tenant = {
id: data.tenantId,
plan: data.plan
};

next();
}