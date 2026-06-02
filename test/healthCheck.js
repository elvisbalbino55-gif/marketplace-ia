#!/usr/bin/env node

/**
 * HEALTH CHECK & API VALIDATION
 * Testa todos os endpoints e funcionalidades
 */

import http from 'http';
import https from 'https';

const API_URL = 'http://localhost:3001';
const tests = [];
let passed = 0;
let failed = 0;

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: body
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// ===== TESTES =====

test('1️⃣ Health Check', async () => {
  const res = await makeRequest('GET', '/api/health');
  assert(res.status === 200, `Status deve ser 200, recebeu ${res.status}`);
  assert(res.body.status === 'healthy', 'Status deve ser "healthy"');
  assert(res.body.uptime > 0, 'Uptime deve ser maior que 0');
});

test('2️⃣ API Status', async () => {
  const res = await makeRequest('GET', '/api/status');
  assert(res.status === 200, `Status deve ser 200, recebeu ${res.status}`);
  assert(res.body.status === 'operational', 'Status deve ser "operational"');
  assert(res.body.services, 'Deve ter services');
});

test('3️⃣ API Info', async () => {
  const res = await makeRequest('GET', '/api');
  assert(res.status === 200, `Status deve ser 200, recebeu ${res.status}`);
  assert(res.body.name, 'Deve ter nome');
  assert(res.body.endpoints, 'Deve ter endpoints');
});

test('4️⃣ Criar Tenant', async () => {
  const res = await makeRequest('POST', '/api/tenants', {
    name: 'Test Company',
    email: 'test@company.com',
    plan: 'professional'
  });
  assert(res.status === 201, `Status deve ser 201, recebeu ${res.status}`);
  assert(res.body.success === true, 'Deve retornar success: true');
  assert(res.body.data.tenant, 'Deve retornar tenant');
  assert(res.body.data.tenant.id, 'Tenant deve ter ID');
  return res.body.data.tenant.id;
});

test('5️⃣ Route 404', async () => {
  const res = await makeRequest('GET', '/api/inexistent');
  assert(res.status === 404, `Status deve ser 404, recebeu ${res.status}`);
  assert(res.body.error === 'Not Found', 'Deve retornar erro Not Found');
});

test('6️⃣ CORS Headers', async () => {
  const res = await makeRequest('GET', '/api/health');
  assert(res.headers['access-control-allow-origin'], 'Deve ter CORS headers');
});

test('7️⃣ Error Handling', async () => {
  const res = await makeRequest('POST', '/api/tenants', {
    // dados inválidos - faltam campos obrigatórios
  });
  assert(res.status !== 200, 'Deve retornar erro para dados inválidos');
});

// ===== RUN TESTS =====

async function runTests() {
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  🚀 AI REVENUE OS - API VALIDATION TEST SUITE         ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n');

  for (const { name, fn } of tests) {
    try {
      console.log(`⏳ ${name}...`);
      await fn();
      console.log(`✅ ${name}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${name}`);
      console.log(`   Error: ${error.message}`);
      failed++;
    }
  }

  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log(`║  📊 RESULTADOS: ${passed} ✅ | ${failed} ❌                       ║`);
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n');

  if (failed === 0) {
    console.log('🎉 TODOS OS TESTES PASSARAM! Sistema está OPERACIONAL!\n');
    process.exit(0);
  } else {
    console.log(`⚠️  ${failed} teste(s) falharam. Verifique os erros acima.\n`);
    process.exit(1);
  }
}

// Aguardar servidor estar pronto
setTimeout(runTests, 2000);
