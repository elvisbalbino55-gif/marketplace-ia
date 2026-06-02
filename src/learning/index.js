import { feedbackLoop } from "./feedbackLoop.js";

export function processLearning(tenantId, results){
return feedbackLoop(tenantId, results);
}