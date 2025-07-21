@echo off
title Playwright Setup met Git en Node.js
setlocal

set LOGFILE=setup_log.txt
echo ==== Setup gestart op %DATE% %TIME% ==== > %LOGFILE%

echo Stap 1: Node.js installeren...
echo [Stap 1] Node.js installeren... >> %LOGFILE%
start /wait "" msiexec /i node-v20.14.0-x64.msi /qn
if %errorlevel% neq 0 (
    echo ❌ Node.js installatie mislukt!
    echo [FOUT] Node.js installatie is mislukt. >> %LOGFILE%
    pause
    exit /b 1
) else (
    echo ✅ Node.js geïnstalleerd.
    echo [OK] Node.js succesvol geïnstalleerd. >> %LOGFILE%
)

timeout /t 10 >nul

echo Stap 2: NPM-packages installeren...
echo [Stap 2] npm install uitvoeren... >> %LOGFILE%
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install is mislukt!
    echo [FOUT] npm install mislukt. >> %LOGFILE%
    pause
    exit /b 1
) else (
    echo ✅ npm install voltooid.
    echo [OK] npm install voltooid. >> %LOGFILE%
)

echo Stap 3: Playwright-browsers installeren...
echo [Stap 3] Playwright chromium installeren... >> %LOGFILE%
call npx playwright install chromium
if %errorlevel% neq 0 (
    echo ❌ Playwright installatie mislukt!
    echo [FOUT] Playwright installatie mislukt. >> %LOGFILE%
    pause
    exit /b 1
) else (
    echo ✅ Playwright geïnstalleerd.
    echo [OK] Playwright chromium geïnstalleerd. >> %LOGFILE%
)

echo Stap 4: Login script uitvoeren...
echo [Stap 4] login.js uitvoeren... >> %LOGFILE%
call node login.js
if %errorlevel% neq 0 (
    echo ❌ login.js i
