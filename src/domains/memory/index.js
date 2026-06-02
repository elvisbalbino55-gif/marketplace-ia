import fs from "fs";

const FILE="./memory.json";

if(!fs.existsSync(FILE)){
  fs.writeFileSync(FILE,"[]");
}

export function saveMemory(item){
  const data = JSON.parse(fs.readFileSync(FILE));

  data.unshift({
    ...item,
    timestamp: new Date().toISOString()
  });

  fs.writeFileSync(FILE, JSON.stringify(data,null,2));

  return data.length;
}

export function getMemory(){
  return JSON.parse(fs.readFileSync(FILE));
}
