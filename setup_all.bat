@echo off
title ✅ Volledige installatie

call setup1.bat
if %errorlevel% neq 0 (
    echo ❌ Git/clone mislukt. Script gestopt.
    pause
    exit /b 1
)

call setup2.bat
if %errorlevel% neq 0 (
    echo ❌ Node/Playwright installatie mislukt.
    pause
    exit /b 1
)

echo ✅ Volledige installatie succesvol afgerond!
pause