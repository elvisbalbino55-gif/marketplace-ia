export async function safeExecute(fn, fallback=null){
  try{
    return await fn();
  }catch(err){
    console.log("[SAFE_EXECUTION_ERROR]", err?.message || err);

    if(fallback){
      return await fallback();
    }

    return {
      success:false,
      error:"execution_failed",
      fallback:true
    };
  }
}
