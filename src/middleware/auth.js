export function authMiddleware(req,res,next){
const key = req.headers["x-api-key"];

if(!key){
return res.status(401).json({error:"missing api key"});
}

// mock tenant resolution
req.tenant = {
id: "tenant_demo",
plan: "pro",
limit: 10000,
used: 0
};

next();
}