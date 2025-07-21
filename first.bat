@echo off
title 🛠 Git installatie + project klonen

setlocal
set LOGFILE=git_clone_log.txt
echo ==== Start op %DATE% %TIME% ==== > %LOGFILE%

:: --- Stap 1: Git controleren/installeren ---
echo Stap 1: Git controleren...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git niet gevonden. Installatie starten...
    echo [INFO] Git wordt geïnstalleerd. >> %LOGFILE%
    start /wait "" Git-2.41.0-64-bit.exe /VERYSILENT /NORESTART
    if %errorlevel% neq 0 (
        echo ❌ Git installatie is mislukt!
        echo [FOUT] Git installatie mislukt. >> %LOGFILE%
        pause
        exit /b 1
    )
    echo ✅ Git succesvol geïnstalleerd.
    echo [OK] Git geïnstalleerd. >> %LOGFILE%
) else (
    echo ✅ Git is al geïnstalleerd.
    echo [OK] Git aanwezig. >> %LOGFILE%
)

:: --- Stap 2: Ga naar Documenten-map en maak projectmap ---
echo Stap 2: Navigeren naar Documenten-map...
cd /d %userprofile%\Documents
if not exist TestECplaywright (
    mkdir TestECplaywright
    echo ✅ Map TestECplaywright aangemaakt.
    echo [OK] Map TestECplaywright gemaakt. >> %LOGFILE%
) else (
    echo ℹ️ Map TestECplaywright bestaat al.
    echo [INFO] Map TestECplaywright bestond al. >> %LOGFILE%
)
cd TestECplaywright

:: --- Stap 3: Repo klonen ---
if not exist playwrightEC (
    echo 🔁 Git repository klonen...
    git clone https://github.com/coradael/playwrightEC.git
    if %errorlevel% neq 0 (
        echo ❌ Git clone is mislukt!
        echo [FOUT] Git clone mislukt. >> %LOGFILE%
        pause
        exit /b 1
    )
    echo ✅ Git repo succesvol gekloond.
    echo [OK] Git clone geslaagd. >> %LOGFILE%
) else (
    echo ℹ️ Repo 'playwrightEC' bestaat al.
    echo [INFO] Repo map bestaat al, clone overgeslagen. >> %LOGFILE%
)

echo ==== Klaar op %DATE% %TIME% ==== >> %LOGFILE%
echo ✅ Alles klaar! Log opgeslagen in %LOGFILE%
pause
