@echo off
title Playwright Setup met Git en Node.js
setlocal enabledelayedexpansion

set LOGFILE=setup_log.txt
echo ==== Setup gestart op %DATE% %TIME% ==== > "%LOGFILE%"

REM Stap 1: Node.js installeren
echo.
echo Stap 1: Node.js installeren...
echo [Stap 1] Node.js installeren... >> "%LOGFILE%"
if not exist "%ProgramFiles%\nodejs\node.exe" (
    start /wait "" msiexec /i node-v20.14.0-x64.msi /qn
    if !errorlevel! neq 0 (
        echo  Node.js installatie mislukt!
        echo [FOUT] Node.js installatie is mislukt. >> "%LOGFILE%"
        pause
        exit /b 1
    ) else (
        echo  Node.js geïnstalleerd.
        echo [OK] Node.js succesvol geïnstalleerd. >> "%LOGFILE%"
    )
) else (
    echo ⚠️ Node.js is al geïnstalleerd, overslaan.
    echo [INFO] Node.js was reeds geïnstalleerd. >> "%LOGFILE%"
)

timeout /t 3 >nul

REM Stap 2: NPM-packages installeren
echo.
echo Stap 2: NPM-packages installeren...
echo [Stap 2] npm install uitvoeren... >> "%LOGFILE%"
call npm install >> "%LOGFILE%" 2>&1
if !errorlevel! neq 0 (
    echo  npm install is mislukt!
    echo [FOUT] npm install mislukt. >> "%LOGFILE%"
    pause
    exit /b 1
) else (
    echo npm install voltooid.
    echo [OK] npm install voltooid. >> "%LOGFILE%"
)

REM Stap 3: Playwright-browsers installeren
echo.
echo Stap 3: Playwright-browsers installeren...
echo [Stap 3] Playwright chromium installeren... >> "%LOGFILE%"
call npx playwright install chromium >> "%LOGFILE%" 2>&1
if !errorlevel! neq 0 (
    echo  Playwright installatie mislukt!
    echo [FOUT] Playwright installatie mislukt. >> "%LOGFILE%"
    pause
    exit /b 1
) else (
    echo  Playwright geïnstalleerd.
    echo [OK] Playwright chromium geïnstalleerd. >> "%LOGFILE%"
)

REM Stap 4: Login script uitvoeren
echo.
echo Stap 4: Login script uitvoeren...
echo [Stap 4] login.js uitvoeren... >> "%LOGFILE%"

call node login.js >> "%LOGFILE%" 2>&1
if !errorlevel! == 0 (
    echo  login.js is mislukt!
    echo [FOUT] login.js is mislukt. >> "%LOGFILE%"
    pause
    exit /b 1
) else (
    echo login.js voltooid.
    echo [OK] login.js voltooid. >> "%LOGFILE%"
)

REM Stap 5: Playwright tests uitvoeren
echo.
echo Stap 5: Playwright tests uitvoeren...
echo [Stap 5] main.spec.js uitvoeren... >> "%LOGFILE%"

call npx playwright test main.spec.js >> "%LOGFILE%" 2>&1
if !errorlevel! == 0 (
    echo Playwright tests zijn mislukt!
    echo [FOUT] Playwright tests zijn mislukt. >> "%LOGFILE%"
    pause
    exit /b 1
) else (
    echo Playwright tests voltooid.
    echo [OK] Playwright tests voltooid. >> "%LOGFILE%"
)

echo.
echo ==== Setup voltooid op %DATE% %TIME% ====
echo ==== Setup voltooid op %DATE% %TIME% ==== >> "%LOGFILE%"
pause