#!/bin/bash

echo "================================"
echo "Dashboard Setup Verification"
echo "================================"
echo ""

echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    node --version
    echo "✓ Node.js is installed"
else
    echo "✗ Node.js is NOT installed!"
    exit 1
fi
echo ""

echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    npm --version
    echo "✓ npm is installed"
else
    echo "✗ npm is NOT installed!"
    exit 1
fi
echo ""

echo "Checking if node_modules exists..."
if [ -d "node_modules" ]; then
    echo "✓ Dependencies are installed"
else
    echo "✗ Dependencies NOT installed"
    echo "Running npm install..."
    npm install
fi
echo ""

echo "Checking project files..."
[ -f "package.json" ] && echo "✓ package.json"
[ -f "index.html" ] && echo "✓ index.html"
[ -f "src/main.jsx" ] && echo "✓ src/main.jsx"
[ -f "src/App.jsx" ] && echo "✓ src/App.jsx"
[ -f "src/mockData.js" ] && echo "✓ src/mockData.js"
echo ""

echo "================================"
echo "Setup verification complete!"
echo "================================"
echo ""
echo "To start the dashboard, run:"
echo "  npm run dev"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:3000"
echo ""

