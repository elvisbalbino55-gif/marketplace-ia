import { observeSystem } from "./observer.js";
import { detectAnomalies } from "./anomalyDetector.js";
import { diagnose } from "./diagnosticEngine.js";
import { repair } from "./selfRepair.js";
import { learnFix } from "./metaLearning.js";

export async function ecosystemLoop(metrics){

const observation = observeSystem(metrics);
const anomalies = detectAnomalies(observation);

if(!anomalies.hasIssues){
return { status: "healthy" };
}

const results = [];

for(const issue of anomalies.issues){

const cause = await diagnose(issue);
const fix = repair(issue);

results.push({ issue, cause, fix });

learnFix(issue, fix, true);
}

return {
status: "self_healed",
results
};
}