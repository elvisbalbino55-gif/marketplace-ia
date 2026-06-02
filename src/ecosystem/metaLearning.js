const history = [];

export function learnFix(issue, fix, success){

history.push({ issue, fix, success });

return {
totalLearned: history.length,
last: history[history.length - 1]
};
}