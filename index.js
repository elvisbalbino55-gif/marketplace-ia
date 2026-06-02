
process.on("uncaughtException",(err)=>{
  console.error("UNCAUGHT_EXCEPTION");
  console.error(err);
});

process.on("unhandledRejection",(err)=>{
  console.error("UNHANDLED_REJECTION");
  console.error(err);
});
import express from "express";
import cors from "cors";
import fs from "fs";

import { authTenant } from "./src/middleware/tenant.js";

import {
execute,
dashboard
} from "./src/controllers/dashboard.controller.js";

import dashboardRoutes from "./src/routes/dashboard.routes.js";
import providersRoutes from "./src/routes/providers.routes.js";
import realtimeRoutes from "./src/routes/realtime.routes.js";
import projectionRoutes from "./src/routes/projection.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/",(req,res)=>{
res.json({
status:"online",
platform:"AI Revenue OS",
version:"3.0"
});
});

app.post(
"/api/v1/execute",
authTenant,
execute
);

app.post(
"/execute",
authTenant,
execute
);

app.get(
"/api/v1/dashboard",
authTenant,
dashboard
);

app.use(
"/api/v1/providers",
providersRoutes
);

app.use(
"/api/v1/realtime",
realtimeRoutes
);

app.use(
"/api/v1/projection",
projectionRoutes
);

app.get("/api/v1/history",(req,res)=>{

const file="./history.json";

if(!fs.existsSync(file))
return res.json([]);

res.json(
JSON.parse(
fs.readFileSync(file)
)
);

});

app.listen(PORT,()=>{

console.log(
"AI Revenue OS ONLINE PORT "+PORT
);

});

