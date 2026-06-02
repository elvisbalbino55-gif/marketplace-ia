import { getEvents } from "./events.js";

export function aggregateBy(field){

const events = getEvents();
const map = {};

for(const e of events){
const key = e[field] || "unknown";

if(!map[key]){
map[key] = [];
}

map[key].push(e);
}

return map;
}