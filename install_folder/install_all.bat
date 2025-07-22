@echo off
title Playwright Setup (Git + Node.js + Clone + Install)
setlocal enabledelayedexpansion
chcp 65001 >nul

:: ==== Algemene instellingen ====
set TEMPDIR2=C:\Temptest\install_folder\
set TEMPDIR1=C:\Temptest\Playwright-project\
set LOGFILE=%TEMPDIR1%\install_log.txt

:: ==== STAP 0: Tijdelijke map aanmaken ====
if not exist "%TEMPDIR1%" (
    mkdir "%TEMPDIR1%"
    echo ✅ Tijdelijke map aangemaakt op %TEMPDIR1%
) else (
    echo ℹ Tijdelijke map bestaat al: %TEMPDIR1%
)
cd /d "%TEMPDIR2%"
echo ==== Setup gestart op %DATE% %TIME% ==== > "%LOGFILE%"

:: ==== STAP 1: Git controleren/installeren ====
echo [1/8] Git controleren...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git niet gevonden. Installatie starten... Als die klaar is run de script opnieuw.
    echo [INFO] Git wordt geïnstalleerd. >> "%LOGFILE%"
    start /wait "" Git-2.50.1-64-bit.exe /VERYSILENT /NORESTART
    if %errorlevel% neq 0 (
        @REM echo ❌ Git installatie mislukt!
        @REM echo [FOUT] Git installatie mislukt. >> "%LOGFILE%"
        pause
        exit /b 1
    )
    echo ✅ Git geïnstalleerd.
    echo [OK] Git geïnstalleerd. >> "%LOGFILE%"
) else (
    echo ✔ Git is al geïnstalleerd.
    echo [OK] Git aanwezig. >> "%LOGFILE%"
)

:: ==== STAP 2: Node.js controleren/installeren ====
echo [2/8] Node.js controleren...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js niet gevonden. Installatie starten...Als die klaar is run de script opnieuw.
    echo [INFO] Node.js wordt geïnstalleerd. >> "%LOGFILE%"
    start /wait "" msiexec /i node-v22.16.0-x64.msi /qn
    timeout /t 10 >nul
    node -v >nul 2>&1
    if %errorlevel% neq 0 (
        @REM echo ❌ Node.js installatie mislukt!
        @REM echo [FOUT] Node.js installatie mislukt. >> "%LOGFILE%"
        pause
        exit /b 1
    )
    echo ✅ Node.js geïnstalleerd.
    echo [OK] Node.js geïnstalleerd. >> "%LOGFILE%"
) else (
    echo ✔ Node.js is al geïnstalleerd.
    echo [OK] Node aanwezig. >> "%LOGFILE%"
)

:: ==== STAP 3: Projectmap voorbereiden ====
echo [3/8] Projectmap voorbereiden...
cd /d "%TEMPDIR1%"
if not exist playwrightEC (
    echo Map 'playwrightEC' wordt klaargezet...
) else (
    echo ℹ Map 'playwrightEC' bestaat al.
    echo [INFO] Map 'playwrightEC' bestaat al. >> "%LOGFILE%"
)

:: ==== STAP 4: Repo klonen ====
echo [4/8] Repo klonen vanaf GitHub...
if not exist playwrightEC (
    git clone https://github.com/coradael/playwrightEC.git
    if %errorlevel% neq 0 (
        echo ❌ Git clone mislukt!
        echo [FOUT] Git clone mislukt. >> "%LOGFILE%"
        pause
        exit /b 1
    )
    echo ✅ Repo succesvol gekloond.
    echo [OK] Repo gekloond. >> "%LOGFILE%"
) else (
    echo ℹ Repo is al aanwezig, overslaan...
)

cd playwrightEC

:: ==== STAP 5: npm install uitvoeren ====
echo [5/8] npm install uitvoeren...
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install mislukt!
    echo [FOUT] npm install mislukt. >> "%LOGFILE%"
    pause
    exit /b 1
)
echo ✅ npm install voltooid.
echo [OK] npm install voltooid. >> "%LOGFILE%"

:: ==== STAP 6: Alleen Chromium installeren ====
echo [6/8] Playwright Chromium installeren...
call npx playwright install chromium
if %errorlevel% neq 0 (
    echo ❌ Playwright installatie mislukt!
    echo [FOUT] Playwright installatie mislukt. >> "%LOGFILE%"
    pause
    exit /b 1
)
echo ✅ Chromium geïnstalleerd.
echo [OK] Chromium geïnstalleerd. >> "%LOGFILE%"

:: ==== STAP 7: Login uitvoeren ====
echo [7/8] Login script uitvoeren...

if not exist "%TEMPDIR1%\playwrightEC\storage\storageState.json" (
    call node login.js
    if %errorlevel% neq 0 (
        echo ❌ login.js mislukt!
        echo [FOUT] login.js mislukt. >> "%LOGFILE%"
        pause
        exit /b 1
    ))
echo ✅ login.js voltooid.
echo [OK] login.js voltooid. >> "%LOGFILE%"

:: ==== STAP 8: Playwright tests uitvoeren ====
echo [8/8] Tests uitvoeren...
call npx playwright test tests/main.spec.js
if %errorlevel% neq 0 (
    echo ❌ Playwright tests zijn mislukt!
    echo [FOUT] Tests zijn mislukt. >> "%LOGFILE%"
    pause
    exit /b 1
)
echo ✅ Alle tests succesvol voltooid.
echo [OK] Tests geslaagd. >> "%LOGFILE%"

:: ==== EINDE ====
echo 🎉 Setup is volledig voltooid!
echo ==== Setup succesvol beëindigd op %DATE% %TIME% ==== >> "%LOGFILE%"
pause
exit /b 0
