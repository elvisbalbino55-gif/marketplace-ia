export function quotaMiddleware(
  req,
  res,
  next
){

  const quota =
    100000;

  req.quota = quota;

  next();

}
