const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const ignore = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next"
]);

const result = [];

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const full = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (!ignore.has(item.name)) walk(full);
      continue;
    }

    if (
      item.name.endsWith(".js") ||
      item.name.endsWith(".json") ||
      item.name.endsWith(".prisma")
    ) {
      const content = fs.readFileSync(full, "utf8");

      result.push({
        file: full.replace(ROOT + path.sep, ""),
        lines: content.split("\n").length,
        bytes: Buffer.byteLength(content)
      });
    }
  }
}

walk(ROOT);

fs.writeFileSync(
  "project_inventory.json",
  JSON.stringify(result, null, 2)
);

console.log("SCAN COMPLETE");
console.log("FILES:", result.length);
console.log("OUTPUT: project_inventory.json");
