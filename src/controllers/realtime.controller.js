import fs from "fs";

const HISTORY_FILE="./history.json";

export function getRealtime(req,res){

 let history=[];

 if(fs.existsSync(HISTORY_FILE)){
   history=JSON.parse(
     fs.readFileSync(HISTORY_FILE)
   );
 }

 const last10=
   history.slice(0,10);

 res.json({

   activeRequests:
     last10.length,

   providers:
     last10.map(
       x=>x.provider
     ),

   timestamp:
     new Date()

 });

}
