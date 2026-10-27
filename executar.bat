@echo off
REM ==============================================================================
REM Script de Execucao do Projeto Guia Social (Windows)
REM ==============================================================================

cd /d "%~dp0"

echo =========================================
echo    Iniciando Guia Social...
echo =========================================

REM 1. Cria ou ativa o ambiente virtual Python
if not exist "venv" (
    echo [1/3] Criando ambiente virtual Python...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo [2/3] Instalando dependencias...
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

REM 2. Se a pasta dist do frontend nao existir e houver npm, compila
if not exist "frontend\dist" (
    where npm >nul 2>nul
    if %errorlevel% equ 0 (
        echo [Frontend] Compilando frontend...
        cd frontend
        call npm install
        call npm run build
        cd ..
    )
)

echo [3/3] Iniciando o servidor em http://127.0.0.1:8000
echo Para encerrar, pressione Ctrl + C no prompt.
echo =========================================

start http://127.0.0.1:8000
python backend\main.py
pause
