
import { getSystemStats, getLeaderboard } from "../billing/engine.js";

export function getDashboardData() {
  return {
    system: getSystemStats(),
    leaderboard: getLeaderboard()
  };
}
