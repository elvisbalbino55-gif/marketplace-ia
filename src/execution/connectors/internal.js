export async function executeAction(action){

  return {
    executed:true,
    connector:"internal",
    action,
    timestamp:new Date().toISOString()
  };
}
