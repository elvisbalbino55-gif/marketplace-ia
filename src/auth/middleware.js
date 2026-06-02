import { verifyToken } from "./jwt.js";

export function authUser(req,res,next){
const header = req.headers["authorization"];

if(!header){
return res.status(401).json({error:"missing token"});
}

const token = header.replace("Bearer ","");
const user = verifyToken(token);

if(!user){
return res.status(401).json({error:"invalid token"});
}

req.user = user;

next();
}