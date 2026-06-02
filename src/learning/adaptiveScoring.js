const weights = {
openai: 1,
claude: 1,
gemini: 1
};

export function adjustWeights(results){

for(const r of results){

const reward = r.reward;

if(reward > 0.7){
weights[r.provider] += 0.1;
}

if(reward < 0.4){
weights[r.provider] -= 0.1;
}
}

return weights;
}

export function getWeights(){
return weights;
}