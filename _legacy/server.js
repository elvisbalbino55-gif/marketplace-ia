import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import Database from "better-sqlite3";

const app = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json());

// 🔥 ISSO É O QUE ESTAVA FALTANDO OU NÃO ATIVO
app.use(express.static("public"));

const db = new Database("./database/saas.db");

db.exec(`
CREATE TABLE IF NOT EXISTS tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company TEXT,
  email TEXT,
  password TEXT,
  apiKey TEXT,
  quota INTEGER,
  requests INTEGER,
  revenue REAL,
  profit REAL
);

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenantId INTEGER,
  prompt TEXT,
  revenue REAL,
  cost REAL,
  profit REAL,
  latency INTEGER,
  createdAt TEXT
);
`);

const tenant = db.prepare("SELECT * FROM tenants WHERE email=?")
  .get("admin@enterprise.com");

if (!tenant) {
  db.prepare(`
    INSERT INTO tenants (company,email,password,apiKey,quota,requests,revenue,profit)
    VALUES (?,?,?,?,?,?,?,?)
  `).run(
    "Enterprise AI",
    "admin@enterprise.com",
    "123456",
    "enterprise_key",
    100000,
    0,
    0,
    0
  );
}

app.listen(3001, () => {
  console.log("🚀 SERVER RUNNING http://localhost:3001");
});
