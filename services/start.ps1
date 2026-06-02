Write-Host "🚀 Starting AI Revenue OS..." -ForegroundColor Cyan

Start-Process powershell -ArgumentList "cd gateway-api; node index.js"
Start-Process powershell -ArgumentList "npx serve public"

Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

Write-Host "✅ System running" -ForegroundColor Green