import { connectors } from "./connectors.js";

export async function executeAction(actionPlan){

const results = [];

for(const action of actionPlan.actions){

const system = connectors[action.system];

if(system){
const result = await system.execute(action.payload);
results.push(result);
}

}

return {
executed: true,
results
};
}