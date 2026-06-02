const network = [];

export function registerNode(node){
network.push(node);
return network.length;
}

export function getNetwork(){
return {
nodes: network.length,
health: 0.8 + Math.random() * 0.2
};
}