@echo off
echo.
echo ==========================================
echo    Custom TMS - Tooling Management System
echo ==========================================
echo.
echo Starting local development server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "index.html" (
    echo ERROR: index.html not found in current directory
    echo Please make sure you're running this script from the Custom TMS project folder
    echo.
    pause
    exit /b 1
)

REM Install http-server if not already installed
echo Installing/updating development server...
npm install -g http-server

REM Start the server
echo.
echo Starting server on http://localhost:8080...
echo.
echo The Custom TMS application will open in your default browser.
echo Press Ctrl+C to stop the server when done.
echo.

http-server -p 8080 -o

pause