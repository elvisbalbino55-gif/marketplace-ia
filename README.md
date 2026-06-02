# 🚀 AI Revenue OS - Gateway API

**Plataforma inteligente de otimização de IA com múltiplos provedores (OpenAI, Claude, Gemini)**

## 📋 Status do Projeto

```
✅ Providers (OpenAI, Claude, Gemini) .... 100%
✅ Middleware & Security ................ 100%
✅ Services Layer ....................... 100%
✅ Controllers & Routes ................. 100%
✅ API Server ........................... 100%
✅ Health Checks ....................... 100%
🟡 Database (Prisma) .................... 40%
🔴 Frontend Dashboard ................... 0%
🔴 Docker & Production Deploy ........... 0%
```

**Progresso Geral: 60% concluído**

---

## 🚀 Quick Start

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env.local
# Editar .env.local com suas API keys
```

### 3. Iniciar servidor
```bash
npm run dev
```

### 4. Rodar testes
```bash
npm test
```

---

## 📊 Testes Automatizados

O projeto inclui um test suite completo que valida:

✅ Health Check (`/api/health`)
✅ Status do Sistema (`/api/status`)
✅ Informações da API (`/api`)
✅ Criação de Tenants
✅ Tratamento de Erros 404
✅ CORS Headers
✅ Error Handling

```bash
# Executar testes
npm test

# Resultado esperado:
# ✅ TODOS OS TESTES PASSARAM!
# 🎉 Sistema está OPERACIONAL!
```

---

## 📚 Endpoints Disponíveis

### Health & Status
- `GET /api/health` - Health check
- `GET /api/status` - Status completo
- `GET /api` - Informações da API

### AI & Análise
- `POST /api/ai/analyze` - Analisar prompt
- `POST /api/ai/evaluate-strategy` - Avaliar estratégia
- `POST /api/ai/optimize` - Otimizar por política
- `GET /api/ai/stats` - Estatísticas de uso

### Tenants
- `POST /api/tenants` - Criar tenant
- `GET /api/tenants/:tenantId` - Obter tenant
- `PUT /api/tenants/:tenantId` - Atualizar tenant
- `GET /api/tenants` - Listar tenants

### Billing
- `POST /api/billing/subscription` - Criar subscription
- `GET /api/billing/subscription` - Obter subscription
- `POST /api/billing/invoice` - Criar fatura
- `GET /api/billing/invoices` - Listar faturas
- `POST /api/billing/invoice/:invoiceId/pay` - Pagar fatura

---

## 🔧 Exemplo de Uso

### 1. Criar um Tenant
```bash
curl -X POST http://localhost:3001/api/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minha Empresa",
    "email": "contato@empresa.com",
    "plan": "professional"
  }'
```

Resposta:
```json
{
  "success": true,
  "data": {
    "tenant": {
      "id": "tenant_1234567890_abc123",
      "name": "Minha Empresa",
      "email": "contato@empresa.com",
      "plan": "professional",
      "status": "active",
      "createdAt": "2026-06-02T10:30:00Z"
    },
    "subscription": {
      "id": "sub_1234567890",
      "plan": "professional",
      "monthlyPrice": 99,
      "monthlyLimit": 10000
    }
  }
}
```

### 2. Analisar com IA (requer autenticação)
```bash
TOKEN="seu_jwt_token"

curl -X POST http://localhost:3001/api/ai/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "prompt": "Analise minha estratégia de marketing",
    "strategy": "balanced",
    "provider": "openai"
  }'
```

---

## 🔑 Variáveis de Ambiente Necessárias

```bash
# AI Providers
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-api03-...
GOOGLE_API_KEY=AIzaSy...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Server
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key

# Database
DATABASE_URL=file:./saas.db

# App
APP_NAME=AI Revenue OS
APP_URL=http://localhost:3001
APP_VERSION=1.0.0
```

---

## 📦 Estrutura do Projeto

```
src/
├── server.js              # Servidor Express principal
├── core/
│   └── core.js            # Core engine
├── providers/             # Integrações com IAs
│   ├── openai.js
│   ├── claude.js
│   ├── gemini.js
│   └── index.js
├── services/              # Lógica de negócio
│   ├── aiService.js
│   ├── tenantService.js
│   ├── strategyService.js
│   └── billingService.js
├── controllers/           # Controladores de requisição
│   ├── aiController.js
│   ├── tenantController.js
│   └── billingController.js
├── routes/                # Definição de rotas
│   ├── ai.js
│   ├── tenants.js
│   ├── billing.js
│   └── index.js
├── middleware/            # Middleware Express
│   ├── auth.js
│   ├── rateLimit.js
│   ├── validation.js
│   ├── errorHandler.js
│   └── logger.js
├── economy/               # Simulação econômica
│   └── simulation.js
├── decision/              # Motor de decisão
│   └── policyRouter.js
└── council/               # Conselho de IAs
    └── aiCouncil.js

test/
└── healthCheck.js         # Suite de testes
```

---

## 🐳 Docker

```bash
# Build imagem
docker build -t ai-revenue-os .

# Rodar container
docker run -p 3001:3001 --env-file .env.local ai-revenue-os
```

---

## 📊 Monitoramento

### Logs em tempo real
```bash
npm run dev
```

### Verificar saúde da API
```bash
curl http://localhost:3001/api/health
```

### Executar testes
```bash
npm test
```

---

## 🚀 Deploy para Produção

### Heroku
```bash
heroku login
heroku create seu-app-name
git push heroku main
heroku config:set $(cat .env.local | tr '\n' ' ')
heroku open
```

### Railway
```bash
npm install -g railway
railway link
railway up
```

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/sua-feature`
2. Commit suas mudanças: `git commit -am 'Add feature'`
3. Push para a branch: `git push origin feature/sua-feature`
4. Envie um Pull Request

---

## 📝 License

MIT - veja LICENSE.md para detalhes

---

## 📞 Suporte

- 📧 Email: support@airevenueos.com
- 💬 Discord: [Comunidade](https://discord.gg/airevenueos)
- 📖 Docs: https://docs.airevenueos.com

---

**Desenvolvido com ❤️ por Elvis Balbino**
