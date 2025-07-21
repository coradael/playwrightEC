@echo off
echo Stap 1: Node.js installeren...

:: Installeer Node.js stilletjes
start /wait "" msiexec /i node-v20.14.0-x64.msi /qn

:: Wacht even zodat Node klaar is met installeren
timeout /t 10 >nul

echo Stap 2: NPM-packages installeren...
call npm install

echo Stap 3: Playwright-browsers installeren...
call npx playwright install chromium

echo stap 4: login runner
call node login.js

echo Stap 5: Tests uitvoeren...
call npx playwright test main.spec.js

pause
