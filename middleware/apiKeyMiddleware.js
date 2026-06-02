export function apiKeyMiddleware(
  req,
  res,
  next
){

  const apiKey =
    req.headers["x-api-key"];

  console.log(
    "API KEY RECEBIDA:",
    apiKey
  );

  const VALID_KEY =
    "enterprise_key";

  if(!apiKey){

    return res.status(401).json({

      success:false,

      error:"API KEY REQUIRED"

    });

  }

  if(apiKey !== VALID_KEY){

    return res.status(401).json({

      success:false,

      error:"INVALID API KEY"

    });

  }

  req.tenant = {

    id:"tenant_enterprise",

    name:"Enterprise Client",

    quota:100000

  };

  next();

}
