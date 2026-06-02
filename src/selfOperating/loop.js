import { businessState } from "./stateEngine.js";
import { observeSystem } from "./observer.js";
import { decide } from "./decisionLoop.js";
import { execute } from "./executor.js";
import { feedback } from "./feedback.js";
import { learn } from "./learning.js";

export async function runCycle(data){

const state = businessState(data);
const observation = observeSystem(state);
const decision = decide(observation);
const execution = await execute(decision);
const fb = feedback(execution);
const learning = learn(fb);

return {
state,
observation,
decision,
execution,
learning
};
}