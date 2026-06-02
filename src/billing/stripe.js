export const stripeConfig = {
publicKey: "pk_test_demo",
plans: {
free: "price_free",
pro: "price_pro",
enterprise: "price_enterprise"
}
};

export function createCheckout(plan){
return {
url: "https://checkout.stripe.com/demo/" + plan
};
}