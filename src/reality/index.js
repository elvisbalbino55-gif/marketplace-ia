import { trackExecution } from "./tracker.js";
import { collectFeedback } from "./feedback.js";
import { applyLearning } from "./learningLoop.js";

export function processReality(tenantId, execution, feedback){

trackExecution(execution);

const enriched = collectFeedback(execution, feedback);

const learning = applyLearning(tenantId, enriched);

return {
status: "learned_from_reality",
learning
};
}