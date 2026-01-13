@echo off
echo ================================
echo Dashboard Setup Verification
echo ================================
echo.

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    pause
    exit /b 1
)
echo ✓ Node.js is installed
echo.

echo Checking npm installation...
npm --version
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)
echo ✓ npm is installed
echo.

echo Checking if node_modules exists...
if exist "node_modules\" (
    echo ✓ Dependencies are installed
) else (
    echo × Dependencies NOT installed
    echo Running npm install...
    npm install
)
echo.

echo Checking project files...
if exist "package.json" echo ✓ package.json
if exist "index.html" echo ✓ index.html
if exist "src\main.jsx" echo ✓ src\main.jsx
if exist "src\App.jsx" echo ✓ src\App.jsx
if exist "src\mockData.js" echo ✓ src\mockData.js
echo.

echo ================================
echo Setup verification complete!
echo ================================
echo.
echo To start the dashboard, run:
echo   npm run dev
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
pause

