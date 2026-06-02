import fs from "fs";

const HISTORY_FILE="./history.json";

export function getProviders(req,res){

 let history=[];

 if(fs.existsSync(HISTORY_FILE)){
   history=JSON.parse(
     fs.readFileSync(HISTORY_FILE)
   );
 }

 const providers={

   OpenAI:0,
   Claude:0,
   Gemini:0

 };

 history.forEach(item=>{

   if(
     providers[item.provider]
     !== undefined
   ){
     providers[item.provider]++;
   }

 });

 res.json(providers);

}
