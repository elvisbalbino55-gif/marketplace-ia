import { openai } from "./providers/openai.js";

export async function safeRun(provider,input){
try{
return await provider.run(input);
}catch(err){
console.log("fallback triggered");

if(provider.name !== "openai"){
return openai.run(input);
}

throw err;
}
}