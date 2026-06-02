import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK NODE PURO FUNCIONANDO");
});

server.listen(3001, () => {
  console.log("NODE PURO RODANDO NA PORTA 3001");
});