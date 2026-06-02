const store = new Map();

export function rateLimit(req,res,next){
const tenant = req.tenant;
const plan = tenant.plan || "free";

const key = tenant.id;

const current = store.get(key) || 0;

const limit = {
free: 100,
pro: 10000,
enterprise: 100000
}[plan];

if(current >= limit){
return res.status(429).json({
error:"rate limit exceeded",
plan
});
}

store.set(key, current + 1);

next();
}