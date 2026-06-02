const events = [];

export function emitEvent(event){
events.push({
...event,
timestamp: Date.now()
});
}

export function getEvents(){
return events;
}