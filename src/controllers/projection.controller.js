import fs from "fs";

const HISTORY_FILE="./history.json";

export function getProjection(req,res){

 let history=[];

 if(fs.existsSync(HISTORY_FILE)){
   history=JSON.parse(
     fs.readFileSync(HISTORY_FILE)
   );
 }

 const revenue=
   history.reduce(
     (a,b)=>
       a+Number(
         b.revenue||0
       ),
     0
   );

 const monthly=
   revenue*30;

 res.json({

   currentRevenue:
     revenue,

   projectedMonthly:
     monthly,

   projectedYearly:
     monthly*12

 });

}
