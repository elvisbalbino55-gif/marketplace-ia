import jwt from "jsonwebtoken";

const SECRET = "dev_secret_key";

export function signToken(payload){
return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token){
try{
return jwt.verify(token, SECRET);
}catch(e){
return null;
}
}