#!/bin/bash

# Romantic Message App - Quick Setup Script for Mac/Linux
# Make executable: chmod +x setup.sh
# Run: ./setup.sh

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║                                                        ║"
echo "║   💌 Romantic Message App - Setup                     ║"
echo "║                                                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please download and install Node.js from:"
    echo "https://nodejs.org/ (LTS version)"
    echo ""
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "server/package.json" ]; then
    echo "❌ Error: Run this script from the project root folder"
    echo ""
    echo "Expected: MY\ PROJECT/setup.sh"
    echo ""
    exit 1
fi

echo "✅ Project folder structure is correct"
echo ""

# Install backend dependencies
echo "📦 Installing dependencies..."
echo ""
cd server

if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ npm install failed!"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "✅ All dependencies installed successfully!"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file..."
    cat > .env << EOF
# Server Configuration
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
MAX_FILE_SIZE=10485760
MAX_PHOTOS=50
EOF
    echo "✅ .env file created with default values"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║                                                        ║"
echo "║   ✅ Setup Complete!                                 ║"
echo "║                                                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Ask if user wants to start the server
read -p "Do you want to start the server now? (Y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting server..."
    echo ""
    echo "Server will run at: http://localhost:3000"
    echo ""
    echo "Press CTRL+C to stop the server"
    echo ""
    npm start
else
    echo ""
    echo "To start the server later, run:"
    echo "  cd server"
    echo "  npm start"
    echo ""
    echo "Then open your browser to: http://localhost:3000"
    echo ""
fi
