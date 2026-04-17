@echo off
REM Romantic Message App - Quick Setup Script for Windows
REM This script will install dependencies and start the server

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                                                        ║
echo ║   💌 Romantic Message App - Setup                     ║
echo ║                                                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/ (LTS version)
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Check if we're in the right directory
if not exist "server\package.json" (
    echo ❌ Error: Run this script from the project root folder
    echo.
    echo Expected: MY PROJECT\setup.bat
    echo.
    pause
    exit /b 1
)

echo ✅ Project folder structure is correct
echo.

REM Install backend dependencies
echo 📦 Installing dependencies...
echo.
cd server

if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ npm install failed!
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies already installed
)

echo.
echo ✅ All dependencies installed successfully!
echo.

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  Creating .env file...
    (
        echo # Server Configuration
        echo PORT=3000
        echo NODE_ENV=development
        echo BASE_URL=http://localhost:3000
        echo MAX_FILE_SIZE=10485760
        echo MAX_PHOTOS=50
    ) > .env
    echo ✅ .env file created with default values
) else (
    echo ✅ .env file already exists
)

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                                                        ║
echo ║   ✅ Setup Complete!                                 ║
echo ║                                                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Ask if user wants to start the server
echo Do you want to start the server now? (Y/N)
set /p start_server=

if /i "%start_server%"=="Y" (
    echo.
    echo 🚀 Starting server...
    echo.
    echo Server will run at: http://localhost:3000
    echo.
    echo Press CTRL+C to stop the server
    echo.
    call npm start
) else (
    echo.
    echo To start the server later, run:
    echo   cd server
    echo   npm start
    echo.
    echo Then open your browser to: http://localhost:3000
    echo.
)

pause
