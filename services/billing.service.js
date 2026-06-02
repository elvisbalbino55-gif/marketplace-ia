export function chargeUser(user, cost) {
  user.credits -= cost;

  if (user.credits < 0) {
    throw new Error("NO_CREDITS");
  }

  return user;
}