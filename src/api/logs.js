import { getLogs } from "../orchestrator/logger.js";

export function logs(req,res){
return res.json({
logs: getLogs()
});
}