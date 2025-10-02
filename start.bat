@echo off
echo ========================================
echo College Management System
echo ========================================
echo.
echo Installing dependencies...
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

if not exist "client\node_modules" (
    echo Installing frontend dependencies...
    cd client
    call npm install
    cd ..
)

echo.
echo ========================================
echo Starting servers...
echo ========================================
echo.
echo Backend: http://localhost:5001
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo.

start cmd /k "cd /d "%~dp0" && npm run server"
timeout /t 3 /nobreak >nul
start cmd /k "cd /d "%~dp0client" && npm start"

echo.
echo Servers are starting in separate windows...
echo You can close this window.
pause
