import { signToken } from "../auth/jwt.js";

export function login(req,res){

const { email } = req.body;

// mock user
const user = {
id: "user_1",
email
};

const token = signToken(user);

return res.json({
token
});
}