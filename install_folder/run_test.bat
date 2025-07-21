@echo off
title Stap 2: Playwright Tests
chcp 65001 >nul
setlocal

echo ==== Playwright tests gestart op %DATE% %TIME% ====

echo ▶ Tests worden uitgevoerd...
npx playwright test tests/main.spec.js

if %errorlevel% neq 0 (
    echo ❌ Tests mislukt!
    pause
    exit /b 1
)

echo ✅ Tests voltooid!
pause
exit /b 0
