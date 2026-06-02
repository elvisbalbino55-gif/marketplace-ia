import fs from "fs";

const DB_FILE = "./db.json";
const HISTORY_FILE = "./history.json";

if(!fs.existsSync(DB_FILE)){
  fs.writeFileSync(DB_FILE, JSON.stringify({
    tenants:[
      {
        apiKey:"demo_key",
        name:"Empresa Demo",
        quota:1000,
        used:0
      }
    ]
  }));
}

if(!fs.existsSync(HISTORY_FILE)){
  fs.writeFileSync(HISTORY_FILE, JSON.stringify([]));
}

function loadDB(){
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB(data){
  fs.writeFileSync(DB_FILE, JSON.stringify(data,null,2));
}

function loadHistory(){
  return JSON.parse(fs.readFileSync(HISTORY_FILE));
}

function saveHistory(data){
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data,null,2));
}

// =========================
// AUTH TENANT (API KEY)
// =========================
export function authTenant(req,res,next){

  const key = req.headers["x-api-key"];

  if(!key){
    return res.status(401).json({error:"API KEY REQUIRED"});
  }

  const db = loadDB();

  const tenant = db.tenants.find(t=>t.apiKey===key);

  if(!tenant){
    return res.status(401).json({error:"INVALID API KEY"});
  }

  if(tenant.used >= tenant.quota){
    return res.status(403).json({error:"QUOTA EXCEEDED"});
  }

  req.tenant = tenant;
  req.db = db;

  next();
}

// =========================
// BILLING ENGINE
// =========================
export function charge(req,cost=1,revenue=2){

  const db = loadDB();

  const tenant = db.tenants.find(t=>t.apiKey===req.tenant.apiKey);

  tenant.used += 1;

  saveDB(db);

  return {
    cost,
    revenue,
    profit: revenue - cost
  };
}
