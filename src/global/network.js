import { emitEvent } from "./events.js";
import { aggregateBy } from "./aggregator.js";
import { globalScore } from "./scoring.js";

export function processGlobalLearning(event){

emitEvent(event);

const bySegment = aggregateBy("segment");
const insights = globalScore(bySegment);

return {
status: "global_learning_updated",
insights
};
}