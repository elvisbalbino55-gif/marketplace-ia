import { createCheckout } from "../billing/stripe.js";

export function checkout(req,res){

const { plan } = req.body;

const session = createCheckout(plan);

return res.json(session);
}