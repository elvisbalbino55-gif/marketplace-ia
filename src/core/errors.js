export function errorResponse(
  res,
  code,
  message
){

  return res.status(code).json({

    success:false,

    error:message

  });

}
